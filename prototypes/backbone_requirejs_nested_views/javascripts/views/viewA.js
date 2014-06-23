define([
    'underscore',
    'library.view'
], function (_, view) {
    
    'use strict';

    var viewA = view.extend({
        
        onInitialize: function() {
            
            console.log('[VIEW A] initializing ...');
            
        },
        
        template: _.template('<section><div>viewA</div><div class="viewB"></div></section>'),
        
        // view events
        events: {
            
        }
        
    });
    
    return viewA;
    
});