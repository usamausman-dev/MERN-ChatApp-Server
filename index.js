const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT
const cors = require('cors')
const path = require('path')


const { createServer } = require('http')
const { Server } = require('socket.io')



const clientpath = path.join(__dirname, './dist')
app.use('/', express.static(clientpath))

app.use(express.json())
app.use(cors())

app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/rooms/router'))
app.use('/api', require('./api/message/router'))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
})

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: "*", } });

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);
    socket.on("disconnect", (message) => console.log("Client disconnected with id: ", message));
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
});

server.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
})