/**
 * vendors.js
 */
(function ($, d3) {
    'use strict';

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
     * Get data object by matching key/value.
     *
     * @param {String} field
     * @param {mixed} value
     * @param {Array} data
     * @return {Object|null}
     */
    Vendors.getEntryByFieldValue = function (field, value, data) {
        /** @var {Object} entry */
        /** @var {Number} index */
        /** @var {Number} length */
        var entry,
            index,
            length = data.length;

        for (index = 0; index < length; index += 1) {
            entry = data[index];

            if (entry[field] && entry[field] === value) {
                return entry;
            }
        }

        return null;
    };

    /**
     * Get values from data object with corresponding key.
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
        /** @var {Number} index */
        /** @var {Array} data */
        /** @var {Array} keys */
        /** @var {Number} length */
        var rows,
            index,
            data = response ? response : [],
            keys = this.getKeys(data[0]),
            length = data.length;

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
                var i, k, t = [];

                for (i = 0; i < keys.length; i += 1) {
                    k = keys[i];
                    t.push(d[k]);
                }

                return t;
            })
            .enter()
            .append('td')
            .text(function (d) {
                return d;
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
