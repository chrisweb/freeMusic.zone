
var playlistModel = function(app) {

    var collection = 'playlist';
    var schema = app.mongoose.Schema;
    var mixedType = schema.Types.Mixed;

    var PlaylistSchema = new Schema({
        name: {type: String, trim: true, required: true},
        createdAt: {type: Date, default: Date.now}
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);
    
    this.model = app.mongoose.model(collection, userSchema);

};

module.exports = playlistModel;