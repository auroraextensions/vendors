/**
 * viewport.js
 */
(function ($) {
    'use strict';

    /** @var {Object} Viewport */
    var Viewport = {};

    /**
     * @return {void}
     */
    Viewport.resize = function () {
        window.setTimeout(function () {
            $(document.documentElement).css({
                'width': (window.innerWidth + 'px')
            });
        }, 500);
    };

    /**
     * @return {void}
     */
    Viewport.onReady = function () {
        this.resize();
        $(window).on('resize', this.resize.bind(this));
    };

    $(document).ready(Viewport.onReady.bind(Viewport));
}).call(this, jQuery);
