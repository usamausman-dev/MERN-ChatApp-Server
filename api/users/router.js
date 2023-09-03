const app = require('express')
const router = app.Router()

const { Login, getUserbyEmail, getUserbyId, updateProfile } = require('./controller')
router.post('/login', Login)
router.get('/userbyemail/:email', getUserbyEmail)
router.get('/userbyid/:_id', getUserbyId)
router.put('/update-profile', updateProfile)



module.exports = router