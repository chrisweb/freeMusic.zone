
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
        var trackModel = initializeTrackModel();
        
        var tracksCollection = initializeTracksCollection(trackModel);
        
        var albumModel = initializeAlbumModel();
        
        var albumsCollection = initializeAlbumsCollection(albumModel);
        
        console.log('****************');
        console.log('# create model but omit name and choose wrong type for the artistId to trigger validate');
        var track1 =  new trackModel({ name: '', artistId: '' });
        track1.save();
        
        console.log('****************');
        console.log('# create valid model');
        var track2 =  new trackModel({ name: 'foo', artistId: 456 });
        track2.save();
        
        console.log('****************');
        console.log('# add and remove model from collection');
        var tracksCollection1 = new tracksCollection();
        tracksCollection1.add(track2);
        tracksCollection1.remove(track2);
        
        console.log('****************');
        console.log('# create a model, add it to a collection, then destroy it');
        console.log('! destroying the model will also automatically remove it from the collection');
        var track3 =  new trackModel({ name: 'bar', artistId: 789 });
        var tracksCollection2 = new tracksCollection();
        tracksCollection2.add(track3);
        track3.destroy();
        
        console.log('****************');
        console.log('# save an album and all it\'s tracks');
        var track4 =  new trackModel({ name: 'bar', artistId: 456, albumId: 123 });
        var track5 =  new trackModel({ name: 'baz', artistId: 456, albumId: 123 });
        var track6 =  new trackModel({ name: 'other', artistId: 456, albumId: 789 });
        var tracksCollection3 = new tracksCollection();
        var album1 = new albumModel({ id: 123, name: 'foo', artistId: 456, tracks: tracksCollection3 });
        tracksCollection3.add(track4);
        tracksCollection3.add(track5);
        tracksCollection3.add(track6);
        album1.saveTracks();
        
    });
    

    /**
     * 
     * initialize the albums collection
     * 
     * @param {Backbone.model} albumModel
     * @returns {Backbone.collection}
     */
    var initializeAlbumsCollection = function(albumModel) {
        
        console.log('initializeAlbumsCollection');
        
        var albumsCollection = Backbone.Collection.extend({
            
            model: albumModel,
            url: 'https://chris.lu/albums',
            initialize: function() {
                
                this.on('add', function(model) {
                    
                    console.log('a model got added to the albums collection');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
                this.on('remove', function(model) {
                    
                    console.log('a model got removed from the albums collection');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
            }
            
        });
        
        return albumsCollection;
        
    };
    
    /**
     * 
     * initialize the album model
     * 
     * @returns {Backbone.model}
     */
    var initializeAlbumModel = function() {
        
        console.log('initializeAlbumModel');
        
        var albumModel = Backbone.Model.extend({
            url: 'https://chris.lu/album',
            defaults: {
                name: '',
                artistId: 0
            },
            initialize: function() {

                this.on('change', function(model) {

                    console.log('some attributes have changed in the albumModel');
                    console.log(model.changedAttributes());

                });
                
                this.on('invalid', function(model) {

                    console.log('some attributes are invalid in the albumModel');
                    console.log(JSON.stringify(model.toJSON()));

                });
                
                this.on('destroy', function(model) {
                    
                    console.log('the album model got destroyed');
                    console.log(JSON.stringify(model.toJSON()));
                    
                });
                
            },
            validate: function(attributes, options) {

                

            },
            saveTracks: function() {
                
                console.log('albumModel saving tracks');
                
                var tracks = this.attributes.tracks;

                console.log(tracks);
                
                Backbone.sync(
                    'update',
                    tracks,
                    {
                        albumId: this.id,
                        success: function() {
                            
                            console.log('successfully saved tracks');
                            
                        },
                        error: function() {
                            
                            console.log('error while saving the tracks');
                            
                        }
                        
                    }
                            
                );
                
                // trigger event
                
            }

        });

        return albumModel;
        
    };
    
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
                    
                    console.log(tracks.length);
                    
                    return tracks;
                    
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