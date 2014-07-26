
/**
 * sample application client code using backbone.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var Backbone = window.Backbone;

    /**
     * on dom loaded
     */
    $(function() {
        
        // initializations
        var TrackModel = initializeTrackModel();
        
        var PlaylistCollection = initializeTracksCollection(TrackModel);
        
        var HistoryCollection = initializeTracksCollection(TrackModel);
        
        // tests
        
        var track = new TrackModel();
        
        var playlist = new PlaylistCollection();
        
        var history = new HistoryCollection();
        
        console.log('playlist length before: ', playlist.length);
        
        playlist.add(track);
        
        console.log('playlist length after: ', playlist.length);
        
        console.log('history length before: ', history.length);
        
        history.add(track);
        
        console.log('history length after: ', history.length);
        
        //-----------------
        console.log('//-----------------');
        
        console.log('playlist length before: ', playlist.length);
        console.log('history length before: ', history.length);
        
        playlist.reset();
        
        console.log('playlist length after: ', playlist.length);
        console.log('history length after: ', history.length);
        
    });
    
    /**
     * 
     * initialize the tracks collection
     * 
     * @param {Backbone.model} trackModel
     * @returns {Backbone.collection}
     */
    var initializeTracksCollection = function(trackModel) {
        
        console.log('initializeTracksCollection');
        
        var tracksCollection = Backbone.Collection.extend({
            
            model: trackModel,
            url: 'https://chris.lu/tracks',
            parse: function(response, options) {
                
                console.log('trackModel content got send to the server');
                console.log(response);
                console.log(options);
                
            },
            initialize: function() {
                
                this.on('add', function(model) {
                    
                    console.log('a model got added to the tracks collection');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
                this.on('remove', function(model) {
                    
                    console.log('a model got removed from the tracks collection');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
            },
            toJSON: function(options) {
                
                console.log('tracksCollection toJSON');
                console.log(options);
                console.log(this);

                var tracks = this.where({ albumId: options.albumId });
                
                if (tracks.length > 0) {
                    
                    if ($.type(options.selectedIds) !== 'undefined') {

                        tracks.filter();

                    }
                    
                    console.log(tracks.length);
                    
                    return tracks;
                    
                } else {
                    
                    return null;
                    
                }
                
            }
            
        });
        
        return tracksCollection;
        
    };
    
    /**
     * 
     * initialize the track model
     * 
     * @returns {Backbone.model}
     */
    var initializeTrackModel = function() {
        
        console.log('initializeTrackModel');
        
        var trackModel = Backbone.Model.extend({
            url: 'https://chris.lu/track',
            defaults: {
                name: '',
                artistId: 0
            },
            initialize: function() {

                console.log('created a new trackModel, initializeing event listeners');

                this.on('change', function(model) {
                    
                    console.log('some attributes have changed in the trackModel');
                    console.log(model.changedAttributes());
                    
                });
                
                this.on('invalid', function(model, errors) {

                    console.log('some attributes are invalid in the trackModel');
                    console.log(model);
                    console.log(errors);

                });
                
                this.on('destroy', function(model) {
                    
                    console.log('the trackModel got destroyed');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
            },
            validate: function(attributes, options) {

                console.log('validate the trackModel input data');
                console.log(attributes);
                console.log(options);

                var errors = [];

                if (attributes.name === '') {
                    
                    errors.push('"name" is required');
                    
                }

                if ($.type(attributes.artistId) !== 'number') {
                    
                    errors.push('"artistId" must be of type number');
                    
                }
                
                if (errors.length > 0) {
                    
                    return errors;
                    
                } else {
                    
                    return false;
                    
                }

            }
            
        });
        
        return trackModel;
        
    };

})(jQuery, window);