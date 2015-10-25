function saveTextFile(filename, text) {
  var anchor = $('<a></a>');
  anchor.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  anchor.attr('download', filename);
  anchor.hide();
  $("body").append(anchor);
  anchor[0].click();
  anchor.remove();
}
$('.header-navigation-list').append('<li><a id="btn-dl-all" href="#"></a></li>');
var btnDefaultText = 'Download This Series';
var btn = $('#btn-dl-all');
btn.text(btnDefaultText);
btn.click(function() {
  btn.text('Loading...');
  var anchors = $('h4.title > a');
  var lessonCount = anchors.length;
  var links = $.map(anchors, function(anchor) {
    return anchor.href;
  });
  var videos = [];
  $.each(links, function(index, link) {
    $.get(link).done(function(html) {
      videos.push($(html).find('#clicker1').attr('href'));
      if (videos.length === lessonCount) {
        btn.text(btnDefaultText);
        var seriesName = location.pathname.split('/')[2];
        saveTextFile(seriesName + '.txt', videos.join('\r\n'));
      }
    });
  });
});
