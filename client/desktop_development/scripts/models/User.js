/**
 * 
 * user model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'underscore',
    'library.model'
    
], function (utilities, _, Model) {
    
    'use strict';

    var UserModel = Model.extend({
        
        url: '/api/user',
        onInitialize: function() {
            
            utilities.log('[USER MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            isLogged: null, // is the user logged in
            id: null,
            nickname: '', // username
            lastFetchDate: null,
            username: 'fasfsafa'
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return UserModel;
    
});