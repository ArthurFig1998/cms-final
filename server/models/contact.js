var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  imageUrl: {
    type: String
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }
});

module.exports = mongoose.model('Contact', schema);
