const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room',
        required: true
    }, // Reference to the room
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }, // Reference to the sender user
    content: {
        type: String,
        required: true
    }, // Message content
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Message = model('message', messageSchema);

module.exports = Message;
