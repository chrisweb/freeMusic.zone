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
        author: { type: String, trim: true },
        name: { type: String, trim: true },
        tweet: { type: String, trim: true },
        date: Date,
        playlistId: { type: mixedType, trim: true },
        trackId: { type: mixedType, required: true }
    },
    { safe: true, wtimeout: 10000 }); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    tweetSchema.set('autoIndex', false);
    
    var tweetModel = app.mongoose.model(collection, tweetSchema);
    
    this.model = new tweetModel();
    
}

/**
 * 
 * save a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.saveOne = function() {
    
    console.log('save a single object');
    
    // this.model
    
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