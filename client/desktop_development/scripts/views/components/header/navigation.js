/**
 * 
 * header navigation component view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * @param {type} UserLibrary
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    'library.user'
    
], function (JST, utilities, View, EventsManager, UserLibrary) {
    
    'use strict';
    
    var HeaderNavigationView = View.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[HEADER NAVIGATION COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            utilities.log(this.options);
            
            var userLibrary = new UserLibrary();
            
            this.options.templateVariables = {
                username: userLibrary.getAttribute('nickname')
            };
            
        },
        
        template: JST['templates/components/header/navigation'],
        
        // view events
        events: {
            'click #leftNavigationButton': 'toggleMenuEvent',
            'click .userButton': 'userButtonClick',
            'click .settingsButton': 'settingsButtonClick'
        },
        
        onRender: function() {
            
        },
        toggleMenuEvent: function toggleMenuEventFunction(event) {
            
            event.preventDefault();
            
            var $menuButton = this.$el.find('#leftNavigationButton');
            
            $menuButton.toggleClass('active');
            
            EventsManager.trigger(EventsManager.constants.MENU_TOGGLE, this);
            
        },
        userButtonClick: function toggleMenuEventFunction(event) {
            
            var routerLibrary = RouterLibrary();
            
            routerLibrary.navigate('desktop/user/profile', { trigger: true });
            
        },
        settingsButtonClick: function toggleMenuEventFunction(event) {
            
            var routerLibrary = RouterLibrary();
            
            routerLibrary.navigate('desktop/application/settings', { trigger: true });
            
        }
        
    });
    
    return HeaderNavigationView;
    
});