const { transaction } = require('../../models')
const { addBook } = require('./book')

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body
        await transaction.create({
            idUser: data.idUser,
            transferProof: data.transferProof,
            remainingActive: 30,
            userStatus: 'Active',
            paymentStatus: 'Approved',
            accountNumber: data.accountNumber
        })

        const getTrans = await transaction.findOne({
            where: {
                idUser: data.idUser
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt',]
                }
            },
            attributes:{
                exclude:['idUser', 'idBook', 'accountNumber', 'createdAt', 'updatedAt',]
            }

        })

        res.status(201).send({
            status: 'succes',
            data: {
                getTrans
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

exports.editTransaction = async (req, res) => {
    try {
        const { id } = req.params

        const data = req.body
        await transaction.update(data, {
            where: {
                id
            }
        })
        const updated = await transaction.findOne({
            where: {
                id
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt',]
                }
            },
            attributes:{
                exclude:['idUser', 'idBook', 'accountNumber', 'createdAt', 'updatedAt',]
            }

        })

        res.status(201).send({
            status: 'succes',
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

exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const getOne = await transaction.findOne({
            where: {
                id
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt',]
                }
            },
            attributes:{
                exclude:['idUser', 'idBook', 'accountNumber', 'createdAt', 'updatedAt',]
            }
        })

        res.send({
            status: 'success',
            data: {
                getOne
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

exports.getAllTransaction = async (req, res) => {
    try {
        const getAll = await transaction.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt',]
                }
            },
            attributes:{
                exclude:['idUser', 'idBook', 'accountNumber', 'createdAt', 'updatedAt',]
            }
        })

        res.send({
            status: 'success',
            data: {
                getAll
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