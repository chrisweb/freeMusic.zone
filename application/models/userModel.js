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
        nickname: {type: String, trim: true, index: { unique: true }, required: true},
        joined: {type: Date},
        lastupdate: {type: Date, default: Date.now},
        oauth: {
            access_token: {type: String, trim: true, required: true},
            expires_in: {type: Integer, trim: true},
            token_type: {type: String, trim: true},
            scope: {type: String, trim: true, required: true},
            refresh_token: {type: String, trim: true, required: true}
        }
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout

    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);

    // password virtual
    userSchema
        .virtual('password')
        .set(function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
        })
        .get(function() {
            return this._password;
        });

    userSchema
        .methods = {

            authenticate: function(plainText) {
                return this.encryptPassword(plainText) === this.hashed_password
            },

            makeSalt: function() {
                return Math.round((new Date().valueOf() * Math.random())) + ''
            },

            encryptPassword: function(password) {
                if (!password) return ''
                return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
            }

        }

    this.model = app.mongoose.model(collection, userSchema);

};

/**
 * 
 * save a single object
 * 
 * @returns {undefined}
 */
userModel.prototype.saveOne = function() {

    console.log('save a single object');

    this.model.set();

};

module.exports = userModel;