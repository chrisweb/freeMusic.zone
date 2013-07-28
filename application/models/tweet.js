/**
 * 
 * tweet model
 * 
 * @param {type} app
 * @returns {tweetsModel}
 */
var tweetModel = function(app) {

    var collection = 'tweet';
    var Schema = app.mongoose.Schema;
    var mixedType = Schema.Types.Mixed;

    /**
     * possible values:
     * String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
     * 
     * @type tweetsModel.Schema
     */
    var tweetSchema = new Schema({
        jamendo_track_id: { type: String, trim: true, required: true, index: true },
        twitter_user_id: { type: String, trim: true, required: true },
        twitter_user_name: { type: String, trim: true },
        twitter_user_image: { type: String, trim: true },
        twitter_tweet_date: Date,
        twitter_tweet_id: { type: String, trim: true, required: true, index: { unique: true } },
        twitter_tweet_original_text: { type: String, trim: true }
    },
    { safe: true, wtimeout: 10000 }); // return errors and 10 seconds timeout

    // should mongoose checks if indexes exist on every startup?
    tweetSchema.set('autoIndex', true);
    
    this.model = app.mongoose.model(collection, tweetSchema);
    
};

/**
 * 
 * save a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.saveOne = function(data, callback) {
    
    console.log('save a single object');
    
    tweet = new this.model(data);
    
    tweet.save(callback);
    
};

/**
 * 
 * save multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.saveAll = function() {
    
    console.log('save multiple objects');
    
};

/**
 * 
 * delete a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.deleteOne = function() {
    
    console.log('delete a single object');
    
};

/**
 * 
 * delete multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.deleteAll = function() {
    
    console.log('delete multiple objects');
    
};

/**
 * 
 * find a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.findOne = function() {
    
    console.log('find a single object');
    
};

/**
 * 
 * find multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.findAll = function() {
    
    console.log('find multiple objects');
    
};

tweetModel.prototype.getPopular = function(options, callback) {
    
    console.log('tweetModel -> getPopular');
    
    var error = false;
    var result = {};
    
    callback(error, result);
    
};

module.exports = tweetModel;