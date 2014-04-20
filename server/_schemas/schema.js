// DEPENDENCIES
// ============

var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema,
    objectID =     Schema.ObjectID;

// USER ACCOUNT SCHEMA
// ===================

var schema = new Schema({
  key: {type: String, default: null}
});

// CREATE DATABASE MODEL
// =====================

var schemaModel = mongoose.model('schemaModel', schema);
module.exports = schemaModel;

// SCHEMA METHODS
// ==============

module.exports.schemaGet = function(req, res) {
  schemaModel.find({'key': 1}, function(err, docs){
    if (err) throw err;
    res.send(docs);
  });
};
