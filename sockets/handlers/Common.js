/**
 * Emerging Citizens
 * Developed by Engagement Lab, 2016
 * ==============
 * Common game socket handler.
 *
 * @class sockets/handlers
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */

var Common = function (nsp, socket) {
    var currentSpace = nsp,
        currentSocket = socket, 
        appRoot = require('app-root-path')
        Session = require(appRoot + '/lib/Common');

    // Expose handler methods for events
    this.handler = {

        'response:send': function(package) {

            console.log(package.promptId);

            currentSpace.emit('test');
            Session.SendResponse(currentSpace, package.data);

        }
    
    };
}

module.exports = Common;