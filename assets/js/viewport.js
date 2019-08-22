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
    Viewport.onReady = function () {
        var innerWidth;

        /** @var {Number} innerWidth */
        innerWidth = window.innerWidth;

        $(document.documentElement).css({
            'width': (innerWidth + 'px')
        });
    };

    $(document).ready(Viewport.onReady.bind(Viewport));
}).call(this, jQuery);
