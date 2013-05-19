/**
 * 
 * user model
 * 
 * @param {type} app
 * @returns {userModel}
 */
var userModel = function(app) {

    var collection = 'user';
    var schema = app.mongoose.Schema;
    var mixedType = schema.Types.Mixed;

    /**
     * possible values:
     * String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
     * 
     * @type tweetsModel.Schema
     */
    var userSchema = new schema({
        nickname: { type: String, trim: true },
        joined: Date,
        lastupdate: Date
    },
    { safe: true, wtimeout: 10000 }); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);
    
    this.model = app.mongoose.model(collection, userSchema);
    
}

/**
 * 
 * save a single object
 * 
 * @returns {undefined}
 */
userModel.prototype.saveOne = function() {
    
    console.log('save a single object');
    
    // this.model
    
};

module.exports = userModel;