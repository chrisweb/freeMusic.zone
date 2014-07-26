
/**
 * sample application client code using backbone.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var Backbone = window.Backbone;
    
    var AppRouter = Backbone.Router.extend({

        routes: {
            ':pageName': 'pageRoute'
        }

    });

    var appRouter = new AppRouter();
    
    // on dom loaded
    $(function() {
        
        // use modernizr to detect if pushstate is available, if not set it to false
        Backbone.history.start({ pushState: true, root: 'C:/Users/chris/Documents/GitHub/jam_tweets/prototypes/backbone' });
        
        appRouter.on('route:pageRoute', function(pageName) {

            console.log('execute javascript of page: ' + pageName);

            ajaxLoadPage(pageName);

        });
        
        ajaxify();

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
            url: 'file:///C:/Users/chris/Documents/GitHub/jam_tweets/prototypes/backbone/' + url,
            dataType: 'html'
        });
        
        request.done(function(data) {
            
            console.log('data: ');
            console.log(data);
            
            $('#page').html(data);
            
            ajaxify();
            
        });

        request.fail(function(jqXHR, textStatus) {
            
            console.log('Request failed: ' + textStatus );
            
        });
        
    };
    
    var ajaxify = function() {

        $('.ajaxyfied').each(function(index, Element) {
            
            console.log('Element: ');
            console.log(Element);
            
            $(Element).on('click', function(event) {
                
                event.preventDefault();

                console.log('$(this).attr(\'href\'): ' + $(this).attr('href'));
                
                appRouter.navigate($(this).attr('href').replace('file:///C:/Users/chris/Documents/GitHub/jam_tweets/prototypes/backbone/', ''), true);
                
            });
            
        });

    };

})(jQuery, window);