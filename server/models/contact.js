/**
 * Created by chang on 2018/3/11.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  "is": Number,
  "name": String,
  "telNum": String,
  "address": String,
  "email": String,
  "birthday": String,
  "collect": Number
});
module.exports = mongoose.model('contacts',contactSchema);
