const {dbURL} = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};
