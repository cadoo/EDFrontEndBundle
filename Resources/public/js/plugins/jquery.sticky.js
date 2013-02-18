/*global Modernizr:true */

// Comment line below in order not to use jQuery noconflict mode
//var $ = jQuery.noConflict();

Modernizr.load([
    //first test the need for polyfill
    {
        test: window.matchMedia,
        nope: "js/lib/matchMedia.js"
    }
]);

// START - sticky elements
var $filter = $('.sticky');
var $filterSpacer = $('<div />', {
    "class": "filter-drop-spacer",
    "height": $filter.outerHeight() + 16
});
if ($filter.size())
{
    $(window).scroll(function ()
    {
        if (!$filter.hasClass('fix') && $(window).scrollTop() > $filter.offset().top)
        {
            $filter.before($filterSpacer);
            $filter.addClass("fix");
        }
        else if ($filter.hasClass('fix')  && $(window).scrollTop() < $filterSpacer.offset().top)
        {
            $filter.removeClass("fix");
            $filterSpacer.remove();
        }
    });
}
// END - sticky nav
// START - animated scroll
function stopAnimatedScroll(){
    if ( $('*:animated').length > 0 ) { $('*:animated').stop(); }
}
if(window.addEventListener) {
    document.addEventListener('DOMMouseScroll', stopAnimatedScroll, false);
}
document.onmousewheel = stopAnimatedScroll;
$(document).on('click', 'nav.sticky li a', function(){
    var target = $(this);
    var hash = this.hash;
    var destination = $(hash).offset().top - $filter.outerHeight() - 16;
    stopAnimatedScroll();
    $('nav.sticky li a').removeClass('active');
    target.addClass('active');
     $('html, body').stop().animate({
        scrollTop: destination
    }, 400, function() { window.location.hash = hash; });
    return false;
});
// END - animated scroll