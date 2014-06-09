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
    'utilities',
    'underscore',
    'model'
], function (utilities, _, model) {
    
    'use strict';

    var UserModel = model.extend({
            
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