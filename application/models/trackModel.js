
var trackModel = function(app) {

    var collection = 'track';
    var schema = app.mongoose.Schema;
    var mixedType = schema.Types.Mixed;

    var TrackSchema = new Schema({
        name: {type: String, trim: true, required: true},
        artist: {type: Schema.ObjectId, ref: 'Artist'},
        album: {type: Schema.ObjectId, ref: 'Album'}
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);
    
    this.model = app.mongoose.model(collection, userSchema);

};

module.exports = trackModel;