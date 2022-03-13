const { book, user } = require('../../models')

exports.getBook = async (req, res) => {
    try {
        const data = await book.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data
        })

    } catch (error) {
        console.log(error);
        res.status().send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.getDetailBook = async (req, res) => {
    try {
        const { id } = req.params
        const detail = await product.findOne({
            where: {
                id
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: {
                detail
            }
        })
    } catch (error) {
        console.log(error);
        res.status().send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.addBook = async (req, res) => {
    try {
        const data = req.body
        const createBook = await book.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id
        })

        res.send({
            status: 'success',
            data: {
                createBook
            }
        })

    } catch (error) {
        console.log(error);
        res.status().send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.editBook = async (req, res) => {
    try {
        const { id } = req.params

        const newBook = req.body
        await book.update(newBook, {
            where: {
                id
            }
        })

        const updated = await book.findOne({
            where:{
                id
            }
        })

        res.send({
            status: 'success',
            data: {
                updated
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteBook = async (req,res)=>{
    try {
        const {id} = req.params
        await book.destroy({
            where:{
                id
            }
        })
        res.status().send({
            status:'success',
            data:{
                id
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}