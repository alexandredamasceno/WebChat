const connection = require('./connection');

const getMessages = async () =>
    connection()
        .then((db) => db.collection('messages').find().toArray());

const saveMessage = async (message, nickname, timestamp) =>
    connection()
        .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

module.exports = {
    getMessages,
    saveMessage,
};
