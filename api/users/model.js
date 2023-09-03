const { Schema, model } = require('mongoose')


const UserSchema = new Schema(

    {
        displayName: {
            type: String,
            required: true
        },
        uid: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
        },
        photoURL: {
            type: String,
            required: true
        },
        joining: {
            type: Date,
            default: Date.now
        }

    }
)


const User = model('user', UserSchema)
module.exports = User;