/*global Modernizr:true */

// Comment line below in order not to use jQuery noconflict mode
//var $ = jQuery.noConflict();

// Breakpoints.js
// -----------------------------------------------
$(window).setBreakpoints({
// use only largest available vs use all available
    distinct: true,
// array of widths in pixels where breakpoints
// should be triggered
    breakpoints: [
        768,
        1024,
        1280
    ]
});

$(window).bind('enterBreakpoint768',function() {
});
$(window).bind('exitBreakpoint768',function() {
});

$(window).bind('enterBreakpoint1024',function() {
});
$(window).bind('exitBreakpoint1024',function() {
});

$(window).bind('enterBreakpoint1280',function() {
});
$(window).bind('exitBreakpoint1280',function() {
});

// END - Breakpoints.js


//$(document).ready(function () {
//    $('body').live('click', function(){
//        $(this).css('background', '#ccc');
//    });
//});






//  Scripts
$(document).ready(function () {

    //  add clickable arrow to submenus
    $("nav[role=navigation] ul ul").parent().append("<i aria-hidden=\"true\" title=\"toggle\"></i>");

    var ww = document.body.clientWidth;
    var updateDropDown = function(e) {
        e.preventDefault();
        if (ww < 768) {
            $("nav[role=navigation] ul i").unbind('click').bind('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('expanded');
                $(this).parent().find("ul:first").fadeToggle('fast');
            });
        }
        if (ww >= 768) {
            $("nav[role=navigation] ul i").removeClass('expanded');
            $("nav[role=navigation] ul ul").fadeOut('slow');
            $("nav[role=navigation] ul i").unbind('click').bind('click', function(e) {
                e.preventDefault();
                $(this).parent().find("ul:first").fadeIn('fast');
                $(this).parent().unbind('hover').bind('hover', function() {
                    $(this).parent().find("ul").fadeOut('slow');
                });
            });
        }
    };
    $(window).load(updateDropDown);
    $(window).bind("resize orientationchange", updateDropDown);


    //$("nav[role=navigation] ul i").unbind('click').bind('click', function(e) {
    //    e.preventDefault();
    //    $(this).toggleClass('expanded');
    //    $(this).parent().find("ul:first").fadeToggle('fast');
    //});

    //$("nav[role=navigation] ul i").unbind('click').bind('click', function(e) {
    //    e.preventDefault();
    //    $(this).parent().find("ul:first").fadeIn('fast');
    //    $(this).parent().unbind('hover').bind('hover', function() {
    //        $(this).parent().find("ul").fadeOut('slow');
    //    });
    //});


    //  links in new window
    $('a[rel=external]').attr('target','_blank');

    //  toggle/show/hide main menu
    var switchmenu = false;
    var updateMenu = function(e) {
        e.preventDefault();
        if (($(window).width() < 767) && !switchmenu ){
            $('.toggle-controls').show();
            $('nav[role="navigation"]').hide();
            $('header[role="banner"] form').hide();
            switchmenu = true;
        }
        else if (switchmenu && ($(window).width() > 767)) {
            $('.toggle-controls').hide();
            $('nav[role="navigation"]').show();
            $('header[role="banner"] form').show();
            switchmenu = false;
        }
    };
    $(window).load(updateMenu);
    $(window).bind("resize orientationchange", updateMenu);

    $('[data-toggle="main-menu"]').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('out');
        $('header[role="banner"]').toggleClass('expanded');
        $('nav[role="navigation"]').toggle();
    });
    $('[data-toggle="search"]').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('out');
        $('header[role="banner"] form').toggle();
    });
    //  END - toggle/show/hide main menu

    //  acordions
    $('.accordion .collapsible').not(':first').hide();
    $('.accordion .toggle').click(function (e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.collapsible').slideUp();
        $(this).siblings('.toggle').removeClass('active');
        $(this).next('.collapsible').slideDown();
    });

    //  add close button to alerts
    $('.alert.close-toggle').append("<button class=\"close\">&times;</button>");
    $('.alert button.close').click(function (e) {
        e.preventDefault();
        $(this).parent().slideUp('fast');
    });

    //  responsive tables
    var switched = false;
    var updateTables = function() {
        if (($(window).width() < 767) && !switched ){
            $('table.responsive').wrap("<div class='table-wrapper' />");
            $('.table-wrapper').after('<p class="label note responsivetableshint"><small><strong>Hint:</strong> Scroll table horizontally to see all the data</small></p>');
            switched = true;
        }
        else if (switched && ($(window).width() > 767)) {
            switched = false;
            $('table.responsive').unwrap();
            $('.responsivetableshint').remove();
        }
    };
    $(window).load(updateTables);
    $(window).bind("resize orientationchange", updateTables);
    //  END - responsive tables

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
    // END - input placeholder in all browsers
});





// //  Responsive js
// //  ------------------------------------------------------
// Modernizr.load([
//     //first test the need for polyfill
//     {
//         test: window.matchMedia,
//         nope: "js/lib/matchMedia.js"
//     }
// ]);
// var mq768max = window.matchMedia("(max-width: 768px)");
// var mq768    = window.matchMedia("(min-width: 768px)");
// var mq1024   = window.matchMedia("(min-width: 1024px)");
// var mq1280   = window.matchMedia("(min-width: 1280px)");

// if (mq768max.matches) {
//     //  put JS code for screen width below 768px here
//     $(document).ready(function () {
//         $("nav[role=navigation] ul i").click(function() {
//             $(this).toggleClass('expanded');
//             $(this).parent().find("ul:first").slideToggle('fast');
//         });
//     });
// }

// if (mq768.matches) {
//     //  put JS code for screen width above 768px here
//     $('body').addClass('width768');
//     //$(document).ready(function(){
//     //    $("nav[role=navigation] ul i").click(function() {
//     //        $(this).parent().find("ul:first").show('fast');
//     //        $(this).parent().hover(function() {
//     //            $(this).parent().find("ul").hide('slow');
//     //        });
//     //    });
//     //});
//     // back to top
//     $(window).scroll(function () {
//         //var a = $(window).height();
//         var a = 150;
//         if ($(window).scrollTop()>=a) {
//             $("a.back-to-top").fadeIn();
//         } else {
//             if ($(window).scrollTop()<a) {
//                 $("a.back-to-top").fadeOut();
//             }
//         }
//     });
//     $('a.back-to-top').click(function (event) {
//         event.preventDefault();
//         $('html, body').animate({scrollTop: '0px'}, 300);
//     });
//     // END - back to top
// }

// if (mq1024.matches) {
//     //  put JS code for screen width above 1024px here
//     $('body').addClass('width1024');
// }

// if (mq1280.matches) {
//     //  put JS code for screen width above 1280px here
//     $('body').addClass('width1280');
// }

// //  Responsive js END
// //  ------------------------------------------------------


