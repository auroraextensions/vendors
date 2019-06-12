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

    /** @property {String} PRIMARY_KEY */
    Vendors.PRIMARY_KEY = 'vendor';

    /**
     * Insert nested <code> elements.
     *
     * @param {Array} data
     * @param {HTMLElement} element
     * @return {this}
     */
    Vendors.insertNamespaces = function (data, element) {
        /** @var {Number} length */
        var code,
            index,
            length = data.length;

        /* Truncate root node text content. */
        element.textContent = '';

        /** @var {Number} index */
        for (index = 0; index < length; index += 1) {
            /** @var {HTMLCodeElement} code */
            code = document.createElement('code');

            element.appendChild(code);
            $(code).text(data[index]);
        }

        return this;
    };

    /**
     * Insert <a> link.
     *
     * @param {String} data
     * @param {HTMLElement} element
     * @return {this}
     */
    Vendors.insertLink = function (data, element) {
        var link,
            isEmail;

        /** @var {HTMLAnchorElement} link */
        link = document.createElement('a');

        /** @var {Boolean} isEmail */
        isEmail = (
            data.split('@').length > 1 && data.split('://').length < 2
        );

        /* Truncate root node text content. */
        element.textContent = '';
        element.appendChild(link);

        $(link).attr('href', isEmail ? 'mailto:' + data : data)
            .attr('target', '_blank')
            .text(data);

        return this;
    };

    /**
     * Insert ExtDN member status icon.
     *
     * @param {Boolean} data
     * @param {HTMLElement} element
     * @return {this}
     */
    Vendors.insertMemberIcon = function (data, element) {
        element.innerHTML = !!data ? '&#10004;' : '&ndash;';

        return this;
    };

    /**
     * Add class to element.
     *
     * @param {String} data
     * @param {HTMLElement} element
     * @return {this}
     */
    Vendors.addClass = function (data, element) {
        $(element).attr('class', data);

        return this;
    };

    /**
     * Parse field data.
     *
     * @param {Object} data
     * @return {mixed}
     */
    Vendors.parseField = function (data) {
        var index,
            key,
            keys = this.getKeys(data),
            length = keys.length,
            result = [];

        for (index = 0; index < length; index += 1) {
            /** @var {String} key */
            key = keys[index];

            /* Add data value to result. */
            result.push(data[key]);
        }

        return result;
    };

    /** @property {Object} FieldHandlers ~ Field-specific functions */
    Vendors.FieldHandlers = {
        namespaces: Vendors.insertNamespaces,
        support: Vendors.insertLink,
        partner: Vendors.addClass,
        extdn: Vendors.insertMemberIcon
    };

    /**
     * Get JSON data endpoint.
     *
     * @return {String}
     */
    Vendors.getJsonEndpoint = function () {
        return document.location.origin + JSON_PATH;
    };

    /**
     * Get reference to the function that is
     * responsible for parsing the given field.
     *
     * @param {String} key
     * @return {Function}
     */
    Vendors.getFieldHandler = function (key) {
        return this.FieldHandlers[key]
            ? this.FieldHandlers[key]
            : function () {};
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
        /** @var {Number} length */
        var rows,
            data = response ? response : [],
            keys = this.getKeys(data[0]),
            length = keys.length;

        /* Set table header columns. */
        d3.select('thead')
            .selectAll('th')
            .data(keys)
            .enter()
            .append('th')
            .text(function (datum) {
                return datum.toUpperCase();
            });


        /** @var {Array} rows */
        rows = d3.select('tbody')
            .selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .attr('class', function (datum) {
                return datum[Vendors.PRIMARY_KEY].split(' ').join('_').toLowerCase();
            });

        rows.selectAll('td')
            .data(this.parseField.bind(this))
            .enter()
            .append('td')
            .attr('data-label', function (datum, index) {
                return keys[index];
            })
            .text(function (datum) {
                return datum;
            })
            .each(function (datum, index, group) {
                /** @var {Function} handler */
                var handler = Vendors.getFieldHandler.call(Vendors, keys[index]);
                handler(datum, group[index]);
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
