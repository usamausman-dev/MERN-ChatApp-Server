const app = require('express')
const router = app.Router()

const { sendMessage, getRoomMessage } = require('./controller')
router.post('/send-message', sendMessage)
router.get('/messages/:room', getRoomMessage)

module.exports = router