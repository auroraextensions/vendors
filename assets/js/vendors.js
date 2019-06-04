/**
 * vendors.js
 */
(function ($, d3) {
    /** @var {String} JSON_ENDPOINT */
    var JSON_ENDPOINT = 'https://raw.githubusercontent.com/auroraextensions/vendors/master/data/vendors.json';

    /** @var {Object} Utils */
    var Utils = {};

    /**
     * Get type of `arg`.
     *
     * @param {mixed} arg
     * @return {String}
     */
    Utils.getType = function (arg) {
        return (typeof arg);
    };

    /**
     * @param {Object} obj
     * @return {Array}
     */
    Utils.getKeys = function (obj) {
        if (!(obj instanceof Object)) {
            throw new TypeError('[Utils.getKeys]: `obj` must be an object, not ' + this.getType(obj));
        }

        return Object.keys(obj);
    };

    /** @var {Object} Vendors */
    var Vendors = Object.create(Utils);

    /**
     * On successful AJAX request.
     *
     * @param {String} response
     * @return {void}
     */
    Vendors.onSuccess = function (response) {
        /** @var {Array} data */
        var data = JSON.parse(response);

        /** @var {Object} entry */
        var entry = data[0];

        /** @var {Array} keys */
        var keys = this.getKeys(entry);

        d3.select('thead')
            .selectAll('th')
            .data(keys)
            .enter()
            .append('th');

        d3.select('tbody')
            .selectAll('tr')
            .data(data)
            .enter()
            .append('tr');
    };

    /**
     * On unsuccessful AJAX request.
     *
     * @param {String} response
     * @return {void}
     */
    Vendors.onError = function (response) {
        console.log(response);
    };

    /** @property {Object} settings */
    Vendors.settings = {
        url: JSON_ENDPOINT,
        error: this.onError.bind(this),
        success: this.onSuccess.bind(this)
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
