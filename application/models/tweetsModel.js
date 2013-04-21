/**
 * 
 * tweets model
 * 
 * @param object app
 * @returns {undefined}
 */
var tweetsModel = function(app) {
    
    var collection = 'tweets';
    var Schema = app.mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var schema = new Schema({
        author: ObjectId,
        name: String,
        date: Date
    });

    app.mongoose.model(collection, schema);
    
};

exports.constructor = tweetsModel;