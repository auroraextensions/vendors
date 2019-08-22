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
        var innerWidth;

        /** @var {Number} innerWidth */
        innerWidth = window.innerWidth;

        $(document.documentElement).css({
            'width': (innerWidth + 'px')
        });
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
