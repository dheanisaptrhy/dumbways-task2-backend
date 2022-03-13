const express = require('express')
const router = express.Router()
//import middleware
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

// import controller
const { getUsers, deleteUser } = require('../controllers/user')
const { register, login } = require('../controllers/auth')
const { getBook, getDetailBook, addBook, editBook, deleteBook } = require('../controllers/book')

//Router User
router.get('/users', getUsers)
router.delete('/user/:id', deleteUser)

//router authentication
router.post('/register', register)
router.post('/login', login)

//router book
router.get('/books', getBook)
router.get('/book/:id', getDetailBook)
router.post('/book', auth, uploadFile('bookFile'), addBook)
router.patch('/book/:id', auth, uploadFile('bookFile'), editBook)
router.delete('/book/:id', deleteBook)

// export router
module.exports = router