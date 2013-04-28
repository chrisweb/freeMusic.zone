/**
 * 
 * tweets model
 * 
 * @param {type} app
 * @returns {tweetsModel}
 */
var tweetsModel = function(app) {

    var collection = 'tweet';
    var schema = app.mongoose.Schema;
    var mixedType = schema.Types.Mixed;

    /**
     * possible values:
     * String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
     * 
     * @type tweetsModel.Schema
     */
    var tweetsSchema = new schema({
        author: { type: String, trim: true },
        name: { type: String, trim: true },
        tweet: { type: String, trim: true },
        date: Date,
        playlistId: { type: mixedType, trim: true },
        trackId: { type: mixedType, required: true }
    },
    { safe: true, wtimeout: 10000 }); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    tweetsSchema.set('autoIndex', false);
    
    this.model = app.mongoose.model(collection, tweetsSchema);
    
}

/**
 * 
 * save a single object
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.saveOne = function() {
    
    console.log('save a single object');
    
    // this.model
    
};

/**
 * 
 * save multiple objects
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.saveAll = function() {
    
    console.log('save multiple objects');
    
};

/**
 * 
 * delete a single object
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.deleteOne = function() {
    
    console.log('delete a single object');
    
};

/**
 * 
 * delete multiple objects
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.deleteAll = function() {
    
    console.log('delete multiple objects');
    
};

/**
 * 
 * find a single object
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.findOne = function() {
    
    console.log('find a single object');
    
};

/**
 * 
 * find multiple objects
 * 
 * @returns {undefined}
 */
tweetsModel.prototype.findAll = function() {
    
    console.log('find multiple objects');
    
};

tweetsModel.prototype.getPopular = function(options, callback) {
    
    console.log('tweetsModel -> getPopular');
    
    var error = false;
    var result = {};
    
    callback(error, result);
    
};

module.exports = tweetsModel;