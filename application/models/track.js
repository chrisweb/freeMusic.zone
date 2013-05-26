
var trackModel = function(app) {

    var collection = 'track';
    var Schema = app.mongoose.Schema;
    var mixedType = Schema.Types.Mixed;

    var trackSchema = new Schema({
        name: {type: String, trim: true, required: true},
        artist: {type: Schema.ObjectId, ref: 'Artist'},
        album: {type: Schema.ObjectId, ref: 'Album'}
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    trackSchema.set('autoIndex', false);
    
    var trackModel = app.mongoose.model(collection, trackSchema);
    
    this.model = new trackModel();

};

module.exports = trackModel;