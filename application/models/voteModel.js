
var voteModel = function(app) {
    
    var collection = 'vote';
    var schema = app.mongoose.Schema;
    var mixedType = schema.Types.Mixed;
    
    var VoteSchema = new Schema({
    
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);
    
    this.model = app.mongoose.model(collection, userSchema);

};

module.exports = voteModel;