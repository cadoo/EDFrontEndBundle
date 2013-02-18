/*jshint laxbreak:true */
/*global enquire:true, $:true, Modernizr:true */

// Comment line below in order not to use jQuery noconflict mode
//var $ = jQuery.noConflict();


//$(document).ready(function () {
//    $('body').live('click', function(){
//        $(this).css('background', '#ccc');
//    });
//});






//  Scripts
$(document).ready(function () {

    $('nav[role=navigation] ul ul').css('display', 'none');
    //  add clickable arrow to submenus
    $('nav[role=navigation] ul ul').parent().append('<i aria-hidden="true" title="toggle"></i>');

    //  links in new window
    $('a[rel=external]').attr('target','_blank');

    //  acordions
    $('.accordion .toggle').prepend('<i aria-hidden="true" tittle="collapse"></i> ');
    $('.accordion .toggle:first').addClass('collapsed');
    $('.accordion .collapsible').not(':first').hide();
    $('.accordion .toggle').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('collapsed')) {
            $(this).addClass('collapsed');
            $(this).siblings('.collapsible').slideUp();
            $(this).siblings('.toggle').removeClass('collapsed');
            $(this).next('.collapsible').slideDown();
        }
    });

    //  add close button to alerts
    $('.alert.close-toggle').append('<button class="close">&times;</button>');
    $('.alert button.close').click(function (e) {
        e.preventDefault();
        $(this).parent().slideUp('fast');
    });

    //  toggle/show/hide main menu and search
    $('[data-toggle=main-menu]').click(function (e) {
        e.preventDefault();
        $('nav[role=navigation]').toggle();
    });
    $('[data-toggle=search]').click(function (e) {
        e.preventDefault();
        $('header[role=banner] form').toggle();
    });

    // input placeholder in all browsers
    if(!Modernizr.input.placeholder){
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() === input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() === '' || input.val() === input.attr('placeholder')) {
                input.addClass('placeholder');
            input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() === input.attr('placeholder')) {
                    input.val('');
                }
            });
        });
    }
});


//  Responsive js
//  ------------------------------------------------------
Modernizr.load([
    //first test the need for polyfill
    {
        test: window.matchMedia,
        nope: 'js/lib/matchMedia.js'
    }
]);
$(function() {

    // less than 768
    enquire.register("screen and (max-width:768px)", {
        match : function() {
            $('nav[role=navigation] ul ul').css('display', 'none');
            $('a.back-to-top').css('visibility', 'hidden');
            $('.toggle-controls').show();
            $('nav[role=navigation]').hide();
            $('header[role=banner] form').hide();
            $('table.responsive').wrap('<div class="table-wrapper" />');
            $('.table-wrapper').after('<p class="label note responsivetableshint"><small><strong>Hint:</strong> Scroll table horizontally to see all the data</small></p>');
            // dropdown menu
            $('nav[role=navigation] ul i').click(function() {
                $(this).toggleClass('expanded');
                $(this).parent().find('ul:first').fadeToggle();
                $(this).parent().off('hover'); // ne radi
            });
        },
        unmatch : function() {}
    }).listen(100);

    // more than 768
    enquire.register("screen and (min-width:768px)", {
        match : function() {
            $('nav[role=navigation] ul i').off('click').removeClass('expanded');
            $('.toggle-controls').hide();
            $('nav[role=navigation]').show();
            $('header[role=banner] form').show();
            $('.responsivetableshint').remove();
            $('div.table-wrapper').removeClass('table-wrapper');
            $('a.back-to-top').css('visibility', 'visible');
            $('a.back-to-top').hide();
            // dropdown menu
            $('nav[role=navigation] ul i').click(function() {
                $(this).parent().find('ul:first').fadeIn();
                $(this).parent().hover(function() {
                    $(this).parent().find('ul').fadeOut();
                });
            });
            // back to top
            $(window).scroll(function () {
                //var a = $(window).height();
                var a = 150;
                if ($(window).scrollTop()>=a) {
                    $('a.back-to-top').fadeIn();
                } else {
                    if ($(window).scrollTop()<a) {
                        $('a.back-to-top').fadeOut();
                    }
                }
            });
            $('a.back-to-top').click(function (e) {
                e.preventDefault();
                $('html, body').animate({scrollTop: '0px'}, 300);
            });
        },
        unmatch : function() {}
    }).listen(100);
});
//  END - Responsive js
//  ------------------------------------------------------


