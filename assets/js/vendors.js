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
     * Get value via key lookup from data array.
     *
     * @param {String} field
     * @param {Array} data
     * @return {Array}
     */
    Vendors.getFieldValues = function (field, data) {
        /** @var {Object} entry */
        /** @var {Number} index */
        /** @var {Number} length */
        /** @var {Array} values */
        var entry,
            index,
            length = data.length,
            values = [];

        for (index = 0; index < length; index += 1) {
            entry = data[index];

            if (entry.hasOwnProperty(field)) {
                values.push(entry[field]);
            }
        }

        return values;
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
            .data(this.getFieldValues('vendor', data))
            .enter()
            .append('tr');

        rows.selectAll('td')
            .data(function (d) {
                return d;
            })
            .enter()
            .append('td');
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
