const chatModel = require('../models/chatModels');

const addNewMessage = async (message, nickname, timestamp) => chatModel
    .saveMessage(message, nickname, timestamp);

const getAllMessages = async () => {
    const messages = await chatModel.getMessages();

    return messages;
};

module.exports = {
    getAllMessages,
    addNewMessage,
};
