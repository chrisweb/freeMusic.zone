
var playlistModel = function(app) {

    var collection = 'playlist';
    var Schema = app.mongoose.Schema;
    var mixedType = Schema.Types.Mixed;

    var playlistSchema = new Schema({
        name: {type: String, trim: true, required: true},
        createdAt: {type: Date, default: Date.now}
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    playlistSchema.set('autoIndex', false);
    
    var playlistModel = app.mongoose.model(collection, playlistSchema);
    
    this.model = new playlistModel();

};

module.exports = playlistModel;