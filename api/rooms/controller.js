const mongoose = require('mongoose')
require('dotenv').config()
const Room = require('./model')

const createRoom = async (req, res) => {
    const { name, user } = req.body;


    if (!name || !user) {
        res.status(500).json({ message: "missing field name=> Room Name , user==> User ID" })

    }

    else {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("DB Connected")

            const existingRoom = await Room.exists({ name })
            if (existingRoom) {
                res.status(500).json({
                    message: "Room exists, Try With a Different Name"
                })
            }

            else {
                await Room.create({ name, users: [user] })
                const rooms = await Room.find({ users: user })
                res.status(201).json({
                    message: "Room Created Successfully",
                    rooms
                })
            }

        }

        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

const joinRoom = async (req, res) => {
    const { name, user } = req.body;
    if (!name || !user) {
        res.status(500).json({ message: "missing field name=> Room Name , user==> User ID" })

    }
    else {
        try {
            await mongoose.connect(process.env.MONGO_URI)

            const existingRoom = await Room.findOne({ name })
            console.log(existingRoom)
            if (!existingRoom) {
                res.status(404).json({ message: "Room Not Found" })
            }

            if (existingRoom.users.includes(user)) {
                return res.status(400).json({ message: 'User is already in the room' });
            }

            else {
                existingRoom.users.push(user);
                await existingRoom.save();
                const rooms = await Room.find({ users: user })
                res.status(200).json({ message: 'User joined the room successfully', rooms });
            }

        }

        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

const roomsById = async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        res.status(500).json({ message: "Please Give ID" })

    }
    else {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("DB Connected")

            const rooms = await Room.find({ users: _id })
            res.json({
                rooms
            })

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}

const roomDetails = async (req, res) => {
    const { name } = req.params;
    if (!name) {
        res.status(500).json({ message: "Please Give Name" })

    }
    else {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("DB Connected")

            const rooms = await Room.findOne({ name })
            res.json({
                rooms
            })

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}


module.exports = { createRoom, joinRoom, roomsById, roomDetails }