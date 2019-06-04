/**
 * vendors.js
 */
(function ($, d3) {
    /** @var {String} JSON_ENDPOINT */
    var JSON_ENDPOINT = 'https://raw.githubusercontent.com/auroraextensions/vendors/master/data/vendors.json';

    /** @var {Object} Vendors */
    var Vendors = {};

    /** @property {Object} settings */
    Vendors.settings = {
        url: JSON_ENDPOINT,
        error: function (response) {
            console.log(response);
        },
        success: function (response) {
            console.log(response);
        }
    };

    /**
     * Initialize vendors table.
     *
     * @return {void}
     */
    Vendors.initialize = function () {
        $.ajax(this.settings);
    };

    /**
     * @return {void}
     */
    Vendors.onLoad = function () {
        this.initialize();
    };

    $(document).ready(Vendors.onLoad.bind(Vendors));
}).call(this, jQuery, d3);
