define([
    'underscore',
    'library.view'
], function (_, view) {
    
    'use strict';

    var viewB = view.extend({
        
        onInitialize: function() {
            
            console.log('[VIEW B] initializing ...');
            
        },
        
        template: _.template('<div>viewB</div>'),
        
        // view events
        events: {
            
        }
        
    });
    
    return viewB;
    
});