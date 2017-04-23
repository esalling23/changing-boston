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
        Session = require(appRoot + '/lib/SessionManager');

    // Expose handler methods for events
    this.handler = {

        'room': function(package) {

            console.log(package);

            currentSocket.join(package);
            console.log('user joined room ' + package);

        },

        'response': function(package) {

            console.log(package);

            Session.Get(package.room).
            Response(currentSpace, package);

        }
    
    };
}

module.exports = Common;