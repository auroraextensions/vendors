/**
 * vendors.js
 */
(function ($, d3) {
    /** @var {String} JSON_PATH */
    var JSON_PATH = '/data/vendors.json';

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
     * Get JSON data endpoint.
     *
     * @return {String}
     */
    Vendors.getJsonEndpoint = function () {
        return document.location.origin + JSON_PATH;
    };

    /**
     * On successful AJAX request.
     *
     * @param {String} response
     * @return {void}
     */
    Vendors.onSuccess = function (response) {
        /** @var {Array} data */
        /** @var {Array} keys */
        var rows,
            data = response ? response : [],
            keys = this.getKeys(data[0]);

        d3.select('thead')
            .selectAll('th')
            .data(keys)
            .enter()
            .append('th')
            .text(function (d) {
                return d.toUpperCase();
            });

        /** @var {Array} rows */
        rows = d3.select('tbody')
            .selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        rows.selectAll('td')
            .data(function (d) {
                return Object.keys(d).map(function (key) {
                    return [+key, d[key]];
                });
            })
            .enter()
            .append('td')
            .text(function (d) {
                return d[1];
            });
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

    /** @property {Object} settings */
    Vendors.settings = {
        url: Vendors.getJsonEndpoint(),
        error: Vendors.onError.bind(Vendors),
        success: Vendors.onSuccess.bind(Vendors)
    };

    $(document).ready(Vendors.onLoad.bind(Vendors));
}).call(this, jQuery, d3);
