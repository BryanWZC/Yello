const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const mongoose = require('mongoose');

async function connect(){
    await mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    handleConnectionError(db);
}

function handleConnectionError(db) {
    db.on('error', err => handleDbError(err));
}

function handleDbError(err) {
    console.error(err);
}

module.exports = connect;