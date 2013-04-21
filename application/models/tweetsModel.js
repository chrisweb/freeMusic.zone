/**
 * 
 * tweets model
 * 
 * @param {type} mongoose
 * @returns {module}
 */
var tweetsModel = function(mongoose) {
    
    var collection = 'tweets';
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var schema = new Schema({
        author: ObjectId,
        name: String,
        date: Date
    });

    mongoose.model(collection, schema);
    
};

exports.get = tweetsModel;