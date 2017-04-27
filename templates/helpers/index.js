var _ = require('underscore');
var hbs = require('handlebars');

module.exports = function() {

    var _helpers = {};

    /**
     * Local HBS Helpers
     * ===================
     */	

    _helpers.scrollHeight = function(array) {

        return (Math.round(array.length/2) * 110).toString() + 'px'

    };

    return _helpers;


};