const { Schema, model } = require('mongoose')

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    }
)

const Room = model('room', RoomSchema)
module.exports = Room;