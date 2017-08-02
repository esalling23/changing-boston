var _ = require('underscore');
var hbs = require('handlebars');

module.exports = function() {

    var _helpers = {};

    /**
     * Local HBS Helpers
     * ===================
     */	
     _helpers.add = function(num, num2) {

        return num + num2;

    };

     _helpers.ifLongerThan = function(array, length, options) {

        if (array.length > length)  {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    };

    _helpers.ifGreaterThan = function(num, num2, options) {

        if (num > num2)  {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    };

    _helpers.scrollHeight = function(array) {

        return (Math.round(array.length/2) * 110).toString() + 'px'

    };

    _helpers.date = function(str) {

        return Date.parse(str);

    };

    return _helpers;


};