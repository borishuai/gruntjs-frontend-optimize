/**
 * @author Arnorld.Deng
 * @createTime 2014.06.03
 * @version 1.0.0
 */
var $appButton = $('.js-home-app'),
  $closeButton = $('.menu_close'),
  $wrapper = $('.basketball-menu_info'),
  $basketMenu = $('.basketball-menu');

var open = false;

_initSwroperContainer();
_initSwriperMenu();
_generateSwiper();

$appButton.on('click', _handlerOpenEvent);

function _handlerOpenEvent(){
  if(open) {
    open = false;
    $wrapper.removeClass('opened-nav');
  } else {
    open = true;
    $wrapper.width($basketMenu.height());
    $wrapper.addClass('opened-nav');
  }
  
}

function _initSwroperContainer() {
  var l = $('.swiper-slide'),
    totalWidth = 0;

  _.each(l, function(item) {
    var itemWidth = $(item).width() + parseInt($(item).css('padding-right'));
    totalWidth = totalWidth + itemWidth;
  }); 

  $('.swiper-wrapper').width(totalWidth);
}

function _initSwriperMenu() {
  var l = $('.swiper-slide');

  l.each(function(e) {
    setTimeout(
      function() {$(l.get(e)).animate({opacity:1,translate3d:'0, 0, 0'},500,'ease-out')},
      $(l.get(e)).attr('data-delay'))
  });
}

function _generateSwiper() {
  var mySwiper = $('.js-swiper-container').swiper({
    mode:'horizontal',
    loop: false,
    paginationClickable: false,
    slidesPerView: 'auto',
  });
}