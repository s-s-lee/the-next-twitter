// const { connect, connection } = require('mongoose');

// // Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://localhost:27017/the-next-twitter';

// connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;


const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/the-next-twitter",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;