
/**
 * sample application client code using backbone.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var Backbone = window.Backbone;
    
    // on dom loaded
    $(function() {
        
        var AppRouter = Backbone.Router.extend({

            routes: {
                'page1.html': 'page1',
                'page2.html': 'page2'
            }

        });
        
        var appRouter = new AppRouter();
        
        appRouter.on('route:page1', function() {
            
            console.log('execute javascript of route 1');
            
        });
        
        appRouter.on('route:page2', function() {
            
            console.log('execute javascript of route 2');
            
        });
        
        // use modernizr to detect if pushstate is available, if not set it to false
        Backbone.history.start({ pushState: true, root: 'Users/chris/Documents/GitHub/jam_tweets/prototypes/backbone/' });
        
        $('.ajaxyfied').each(function(index, Element) {
            
            console.log('Element: ');
            console.log(Element);
            
            $(Element).on('click', function(event) {
                
                event.preventDefault();
                
                Backbone.history.navigate('/' + $(this).attr('href'), true);
                
                ajaxLoadPage($(this).attr('href'));
                
            });
            
        });
        
    });

    /**
     * 
     * load a page with ajax
     * 
     * ! if chrome blocks the requests because of cors, launch chrome using the
     * following command: chrome --allow-file-access-from-files
     * on windows make a shortcut to: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -allow-file-access-from-files
     * 
     * @param {type} url
     * @returns {undefined}
     */
    var ajaxLoadPage = function(url) {
        
        console.log('url: ' + url);
        
        var request = $.ajax({
            type: 'GET',
            url: 'file:///C:/Users/chris/Documents/GitHub/jam_tweets/prototypes/history.js/' + url,
            dataType: 'html'
        });
        
        request.done(function(data) {
            
            console.log('data: ');
            console.log(data);
            
            $('#page').html(data);
            
        });

        request.fail(function(jqXHR, textStatus) {
            
            console.log('Request failed: ' + textStatus );
            
        });
        
    };

})(jQuery, window);