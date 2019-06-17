(function ($) {
    "use strict";
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    $('.crossfade').crossfade({
        threshold: 0.1
    });
    $('a[data-toggle]').on('click', function (e) {
        e.preventDefault();
    });
    $(function () {
        if (!isMobile.any()) {
            $('.equal-height').matchHeight();
            $("#side").stick_in_parent({
                offset_top: 100
            });
        }
    });
    if ($('a[rel="lightbox"]').length > 0) {
        $(function () {
            $('a[rel="lightbox"]').boxer({
                fixed: true
            });
        });
    }
    if ($("#supporters-container").length > 0) {
        $("#supporters-container").wallpaper({
            source: {
                poster: "images/garbage.jpg",
                mp4: "video/garbage.mp4",
                ogg: "video/garbage.ogv",
                webm: "video/garbage.webm"
            }
        });
    }
    $('.supporter').popover({
        trigger: 'hover'
    });
    if ($('.animated').length > 0 && !isMobile.any()) {
        $('.animated').waypoint(function () {
            var target = $(this);
            if (!target.hasClass('animated_off')) {
                $(target).delay(150).velocity("transition.slideUpIn");
                target.addClass('animated_off');
            }
        }, {
            offset: $.waypoints('viewportHeight')
        });
    } else {
        $('.animated').css('opacity', 1);
    }
    $('.counter').waypoint(function () {
        $(this).animateNumbers($(this).data('number'));
    }, {
        offset: $.waypoints('viewportHeight')
    });
    $('.progress-bar').waypoint(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + "%");
    }, {
        offset: $.waypoints('viewportHeight')
    });
    $('.smooth-scroll').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if (!isMobile.any()) {
            $(target).velocity("scroll", {
                duration: 1000,
                delay: 200
            });
        } else {
            $(target).velocity("scroll", {
                duration: 1000,
                delay: 200,
                offset: -60
            });
        }
    });
    if (isMobile.any()) {
        $('.menu-item').on('click', function () {
            $('#toggle-main-nav').prop('checked', false);
        });
    }
})(jQuery);