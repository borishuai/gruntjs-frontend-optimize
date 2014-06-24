/**
 * @author Elaine.Wang
 * @createTime 2014.06.03
 * @version 1.0.0
 */

var $primary = $('.js-primary'),
  $menu = $('.js-primary_home '),
  $menuModal = $('.js-menu-modal'),
  $menuDownload = $('.js-menu-download'),
  $menuSecondary = $('.js-menu-secondary'),
  $menuSecondaryLink = $('.js-menu-secondary a'),
  $content = $('.js-content');

_initIScroll();
_activeMenuSecondary();

$menu.on('click', function() {
  if ($menuModal.hasClass('hide')) {
    $menuModal.removeClass('hide');
  } else {
    $menuModal.addClass('hide');
  }
});

$menuDownload.on('click', function() {
  if(navigator.userAgent.match(/Android/i)) {
    $menuDownload.attr('href', 'http://www.177991.com/download/android/basketball.apk');
    return confirm('将下载安装包到您的设备中?');
  } else {
    $menuDownload.attr('target', '_blank');
    $menuDownload.attr('href', 'https://itunes.apple.com/cn/app/zheng-ba-lan-tan/id695380588?mt=8');
  }
});

function _initIScroll() {
  var myScroll,
    primaryHeight = $primary.height(),
    menuSecondaryHeight = $menuSecondary.height();

  $content.css('top', primaryHeight + menuSecondaryHeight + 'px');

  if ($content.length > 0) {
    myScroll = new iScroll('iscroll-wrapper');
  }
}

function _activeMenuSecondary() {
  var urlstr = location.pathname,
    urlstatus = false;

  $menuSecondaryLink.each(function () {
    var href = $(this).attr('href');

    if ((urlstr === href) && href !== '') {
      $(this).closest('li').addClass('active');
      urlstatus = true;
    } else {
      $(this).closest('li').removeClass('active');
    }
  });

  if (!urlstatus) {$("#menu a").eq(0).addClass('active'); }
}