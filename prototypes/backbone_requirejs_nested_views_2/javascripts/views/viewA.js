define([
    'underscore',
    'library.view',
    'library.container'
], function (_, view, container) {
    
    'use strict';

    var viewA = view.extend({
        
        onInitialize: function(options) {
            
            console.log('[VIEW A] initializing ...');
            
            console.log(options);
            
            this.viewB = options.nestedViews[0];
            
        },
        
        onRendered: function() {
            
            console.log('[VIEW A] rendered ...');
            
            console.log(this.viewB);
            
            container.add('.viewB', this.viewB);
            
            // even in onRendered the viewA has not been dispatched yet, so
            // viewB can not be inserted into the div with class viewB
            container.dispatch();
            
        },
        
        template: _.template('<section><div>viewA</div><div class="viewB"></div></section>'),
        
        // view events
        events: {
            
        }
        
    });
    
    return viewA;
    
});