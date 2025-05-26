const mongoose = require('mongoose');

async function connectToMongoDb(url) {
   if (!url) {
      throw new Error('MongoDB URI is undefined. Please provide a valid URI.');
   }
   return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
}

module.exports = connectToMongoDb;