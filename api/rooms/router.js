const app = require('express')
const router = app.Router()

const { createRoom, joinRoom, roomsById, roomDetails } = require('./controller')
router.post('/create-room', createRoom)
router.get('/room/:_id', roomsById)
router.post('/join-room', joinRoom)
router.get('/room-details/:name', roomDetails)

module.exports = router