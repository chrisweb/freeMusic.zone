
/**
 * sample application client code using history.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {
    
    // on dom loaded
    $(function() {
        
        // Note: We are using statechange instead of popstate
        History.Adapter.bind(window, 'statechange', function() { 
            
            // Note: We are using History.getState() instead of event.state
            var State = History.getState();
            
            console.log('State: ');
            console.log(State);
            
            ajaxLoadPage(State.url);

            // find out which page got called
            if (State.url.search('page1.html') !== -1) {
                
                console.log('execute javascript of route 1');
                
            }
            
            if (State.url.search('page2.html') !== -1) {
                
                console.log('execute javascript of route 2');
                
            }
            
        });
        
        // bind link listeners
        $('.ajaxyfied').each(function(index, Element) {
            
            console.log('Element: ');
            console.log(Element);
            
            $(Element).on('click', function(event) {
                
                event.preventDefault();
                
                History.pushState({state:1}, 'State 1', $(this).attr('href'));
                
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
            url: url,
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