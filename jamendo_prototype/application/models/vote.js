
var voteModel = function(app) {
    
    var collection = 'vote';
    var Schema = app.mongoose.Schema;
    var mixedType = Schema.Types.Mixed;
    
    var voteSchema = new Schema({
    
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    voteSchema.set('autoIndex', false);
    
    var voteModel = app.mongoose.model(collection, voteSchema);
    
    this.model = new voteModel();

};

module.exports = voteModel;