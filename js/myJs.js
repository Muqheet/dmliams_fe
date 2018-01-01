// To highlight navbar elements
function highlightNavBarElements(hrefUrl) {
  console.log('highlightNavBarElements enter');
  if ($('li > a').hasClass('nav-active'))
    removeClass('nav-active');
  $('li > a[href="/' + hrefUrl + '"]').addClass('nav-active');

}
