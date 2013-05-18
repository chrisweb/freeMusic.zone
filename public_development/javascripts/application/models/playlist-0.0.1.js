/**
 * 
 * playlist model
 * 
 * usage: 
 * modelName.attributes retrieves attributes json
 * modelName.get('attributeKey') returns the attribute value
 * modelName.set('attributeKey', value) sets the attribute value
 * modelName.set({ foo: 'bar' }) you can pass an object to setm to set multiple
 * attributes at once
 * modelName.set({ foo: 'bar' }, { silent: true }) the second parameter can be
 * an options object (if silent is true the model "change" event will not fire)
 * to clear an attribute use modelName.unset('key', options), the options
 * object can be validate: true
 * to validate attributes: modelName.validate = function() { //validate }
 * 
 */
define('playlistModel', ['configuration', 'utilities', 'backbone', 'underscore'], function(configuration, utilities, Backbone, _) {
    
    'use strict';

    return Backbone.Model.extend({
        
        // initialize the model
        initialize: function() {
            
            utilities.log('tweets model got initialized');
            
            this.on('change', function() {
                
                utilities.log('some model values changed');
                
            });
            
        },
        
        // model default values
        defaults: {
            
            id: '',
            name: '',
            lastUpdate: ''
            
        },
                
        reset: function() {
    
            this.destroy();
    
        }
        
    });

});