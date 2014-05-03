define([
    'backbone',
    'utilities',
    'underscore'
], function(Backbone, utilities, _) {

    'use strict';

    var View = Backbone.View.extend({
        
        close: function() {

            

        },
        onClose: function() {
        
            var args = _.tail(arguments, 2);

            if (_.isFunction(this.onClose)) {
                
                this.onClose.apply(this, args);
                
            }
            
        }

    });

    return View;

});