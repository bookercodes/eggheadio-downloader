function saveTextFile(filename, text) {
  var ele = document.createElement('a');
  ele.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  ele.setAttribute('download', filename);
  ele.style.display = 'none';
  document.body.appendChild(ele);
  ele.click();
  document.body.removeChild(ele);
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
      anmas
      videos.push($(html).find('#clicker1').attr('href'));
      if (videos.length === lessonCount) {
        btn.text(btnDefaultText);
        var seriesName = location.pathname.split('/')[2];
        saveTextFile(seriesName + '.txt', videos.join('\r\n'));
      }
    });
  });
});
