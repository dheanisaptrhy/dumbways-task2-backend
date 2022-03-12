const express = require('express')
const router = express.Router()

// import controller
const {addUser} = require('../controllers/user')
const {register, login} = require('../controllers/auth')

//Router User
router.post('/user',addUser)

//router auth
router.post('/register',register)
router.post('/login',login)

// export router
module.exports = router