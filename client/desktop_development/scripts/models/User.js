/**
 * 
 * user model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} model
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.model'
], function (utilities, _, model) {
    
    'use strict';

    var UserModel = model.extend({
        
        url: '/api/user',
        onInitialize: function() {
            
            utilities.log('[USER MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            isLogged: false, // is the user logged in
            name: '' // username
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return UserModel;
    
});