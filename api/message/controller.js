const mongoose = require('mongoose')
require('dotenv').config()
const Message = require('./model')



const sendMessage = async (req, res) => {
    const { room, sender, content } = req.body
    if (!room || !sender || !content) {
        res.status(500).json({ message: "Missing Required Fields" })
    }

    else {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            await Message.create({ room, sender, content })
            res.status(201).json({
                message: "Message Sent Successfully",
            })

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}

const getRoomMessage = async (req, res) => {
    try {
        const { room } = req.params
        await mongoose.connect(process.env.MONGO_URI)
        const messages = await Message.find({ room })
        res.status(200).json({ messages });
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendMessage, getRoomMessage }