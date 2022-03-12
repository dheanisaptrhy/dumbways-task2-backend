const express = require('express')
const router = express.Router()

// import controller
const {addUser} = require('../controllers/user')
const {register} = require('../controllers/auth')

//Router User
router.post('/user',addUser)

//router auth
router.post('/register',register)

// export router
module.exports = router