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
        jamendo_track_id: {type: String, trim: true, required: true, index: true},
        twitter_user_id: {type: String, trim: true, required: true},
        twitter_user_name: {type: String, trim: true},
        twitter_user_image: {type: String, trim: true},
        twitter_tweet_date: Date,
        twitter_tweet_id: {type: String, trim: true, required: true, index: {unique: true}},
        twitter_tweet_original_text: {type: String, trim: true}
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

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

tweetModel.prototype.mapReduce = function(options, callback) {

    console.log('tweetModel -> mapReduce');

    var mapReduceContainer = {};
    
    var dateOject = new Date();
    
    var oneDayAgo = dateOject.getDate()-1;
    var oneWeekAgo = dateOject.getDate()-7;
    
    mapReduceContainer.map = tweetsMap;
    mapReduceContainer.reduce = tweetsReduce;
    mapReduceContainer.query = { twitter_tweet_date : { $gt : oneDayAgo }};
    
    tweet = new this.model();

    tweet.mapReduce(mapReduceContainer, callback)

};

var tweetsMap = function() {

    return emit(this.jam_unit + '-' + this.jam_id, this.tw_userid);

}

var tweetsReduce = function(jam_richid, tw_users) {

    jam_richid = jam_richid.split("-");

    var jam_unit = jam_richid[0];
    var jam_id = jam_richid[1];
    var reduceVal = {id: jam_id, unit: jam_unit, count_tot: 0, count_uniq: 0, users: []};

    for (var i; i < this.tw_users.length; i++) {

        if (reduceVal.users.indexOf(this.tw_users[i]) == -1) {

            reduceVal.users.push(this.tw_users[i]);
            reduceVal.count_uniq++;

        }

        reduceVal.count_tot++;

    }

    return reduceVal;

}

module.exports = tweetModel;
