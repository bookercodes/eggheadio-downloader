function saveTextFile(filename, text) {
  var anchor = $('<a></a>');
  anchor.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  anchor.attr('download', filename);
  anchor.hide();
  $("body").append(anchor);
  anchor[0].click();
  anchor.remove();
}

$('.header-navigation-list').append('<li><a id="button-dl-all" href="#">Download This Series</a></li>');

var button = $('#button-dl-all');

function fetchLessonDownloadLink(lessonLink, done) {
  $.get(lessonLink).done(function(html) {
    var lessonDownloadLink = $(html).find('#clicker1').attr('href');
    done(lessonDownloadLink);
  });
}

button.click(function() {
  button.text('Loading...');

  var lessonAnchors = $('h4.title > a');
  var lessonLinks = $.map(lessonAnchors, function(anchor) {
    return anchor.href;
  });
  var lessonCount = lessonLinks.length;
  var lessonDownloadLinks = [];

  $.each(lessonLinks, function(index, lessonLink) {
    fetchLessonDownloadLink(lessonLink, function(lessonDownloadLink) {
      lessonDownloadLinks.push(lessonDownloadLink);
      if (lessonDownloadLinks.length === lessonCount) {
        button.text('Download This Series');
        var seriesName = location.pathname.split('/')[2];
        var crlf = '\r\n';
        saveTextFile(seriesName + '.txt', lessonDownloadLinks.join(crlf));
      }
    });
  });
});
