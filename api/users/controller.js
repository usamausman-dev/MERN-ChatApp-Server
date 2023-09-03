const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./model')



const Login = async (req, res) => {
    const { displayName, phoneNumber, email, photoURL, uid } = req.body;
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(200).json({
                message: "User Loggined"
            })
        }

        else {
            await User.create({ displayName, phoneNumber, email, photoURL, uid })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}


const getUserbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const getUserbyId = async (req, res) => {

    const { _id } = req.params


    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ _id })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const updateProfile = async (req, res) => {
    const { _id, displayName, photoURL, phoneNumber } = req.body

    if (!_id) {
        res.status.json(
            { message: "Id is required" }
        )

    }
    else {
        try {
            const filter = { _id }
            const update = { displayName, photoURL, phoneNumber }
            await mongoose.connect(process.env.MONGO_URI)
            const user = await User.findOneAndUpdate(filter, update, {
                new: true
            });

            res.json({ message: "Updated Successfully", user })

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

}
module.exports = { Login, getUserbyEmail, getUserbyId, updateProfile }