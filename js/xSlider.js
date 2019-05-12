/*
 * @fileOverview xSlider
 * @version 1.4.0
 * @date 2016-2-25
 * @author Xinbo Shang
 *
 */

"use strict";

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS Module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery || Zepto);
    }
}(function($) {
    //jQuery must be required
    if (!$) {
        return console.warn('xSlider needs jQuery');
    }
    
    $.fn.extend({
        xSlider: function(options) {
            var defaults = {
                autoplay: true,
                interval: 3000,
                speed: 400,
                nav: true,
                page: false,
                scrollNum: 1,
                direction: 'ltr',  //ltr rtl
                controls: true,
                hover: false,
                refresh: true
            };

            var options = $.extend(defaults, options);
            
            //Multi element support
            return this.each(function() {

                var cont = $(this),
                    setUl = cont.find('ul'),
                    item = setUl.find('li'),
                    current = 0,
                    roll,
                    group,
                    working,
                    timer;

                var slider = {
                    init: function() {
                        roll = options.scrollNum * 100 + '%';
                        group = Math.ceil(item.length / options.scrollNum); // focus point nums;
                        working = false; // when is the slider switching, you can't start a new switch;
                        timer = ''; // autoplay timer

                        if (item.length > 1) {
                            setUl.css({
                                'width': (item.length + options.scrollNum * 2) * 100 + '%',
                                'margin-left': -options.scrollNum * 100 + '%',
                                'left': '0'
                            });
                            item.css({
                                'float': 'left',
                                'listStyle': 'none',
                                'width': 100 / (item.length + options.scrollNum * 2) + '%'
                            });
                            setUl.html(item.slice(0).clone());
                            setUl.append(item.slice(0, options.scrollNum).clone());
                            setUl.prepend(item.slice(-options.scrollNum).clone());
                            this.set();
                        }
                    },
                    set: function() {
                        var _this = this;

                        // left / right  buttons
                        if (options.controls) {
                            cont.append('<div class="xslider-arrow"><span class="prev"></span><span class="next"></span></div>');
                            cont.find('.xslider-arrow').on('click', '.next', function(event) {
                                _this.stopAuto();
                                _this.toNext();
                                _this.autoPlay();
                            }).on('click', '.prev', function(event) {
                                _this.stopAuto();
                                _this.toPrev();
                                _this.autoPlay();
                            });
                        }


                        if (options.nav || options.page) {
                            var dom = '<div class="xslider-nav">';

                            if (options.nav) {

                                for (var i = 0; i < group; i++) {
                                    if (i == 0) {
                                        dom += '<span class="active"></span>';
                                    } else {
                                        dom += '<span></span>';
                                    }
                                }
                            }
                            if (options.page) {
                                dom += '<p><font>1</font>/' + group + '</p>';
                            }
                            dom += '</div>';
                            cont.append(dom).find('.xslider-nav').on('click', 'span', function() {
                                if (!working) {
                                    var pos_click = $('.xslider-nav span', cont).index($(this));
                                    _this.stopAuto();
                                    _this.animate(pos_click);
                                    _this.autoPlay();
                                }
                            });
                        }

                        if (options.hover) {
                            cont.hover(function() {
                                _this.stopAuto();
                            }, function() {
                                _this.autoPlay();
                            });
                        }

                        this.autoPlay();
                    },
                    autoPlay: function() {
                        var _this = this;
                        if (options.auto) {
                            timer = setInterval(function() {
                                if (options.direction == 'left') {
                                    _this.toPrev();
                                } else {
                                    _this.toNext();
                                }
                            }, options.interval);
                        }
                    },
                    stopAuto: function() {
                        if (options.auto) {
                            clearInterval(timer);
                        }
                    },
                    animate: function(num) {
                        working = true;
                        var _this = this;
                        setUl.velocity({
                            left: -num * 100 + '%'
                        }, options.speed, function() {
                            if (num < 0) {
                                current = group - 1;
                                setUl.css('left', -(group - 1) * 100 + '%');
                            } else if (num >= group) {
                                current = 0;
                                setUl.css('left', 0);
                            } else {
                                current = num;
                            }
                            _this.setPosition(current);
                            working = false;
                        });
                    },
                    toNext: function() {
                        if (!working) {
                            working = true;
                            var next = current + 1;
                            this.animate(next);
                        }
                    },
                    toPrev: function() {
                        if (!working) {
                            working = true;
                            var next = current - 1;
                            this.animate(next);
                        }
                    },
                    setPosition: function(num, dir) {
                        if (options.nav) {
                            cont.find('.xslider-nav').find('span').removeClass('active').eq(num).addClass('active');
                        }
                        if (options.page) {
                            cont.find('.xslider-nav').find('font').html(num + 1);
                        }
                    },
                    destroy: function() {
                        if (item.length > 1) {
                            if (options.controls) {
                                $('.xslider-arrow', cont).remove();
                            }
                            if (options.nav) {
                                cont.find('.xslider-nav').remove();
                            }
                            this.stopAuto();
                            working = false;
                        }
                    }
                };
                slider.init();
            });
        }
    });
}));