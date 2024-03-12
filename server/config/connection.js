const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gnomeDB';

console.log("Using connection string:", connectionString)

connect(connectionString);

module.exports = connection;