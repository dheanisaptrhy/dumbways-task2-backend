const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'role']
            }
        })
        res.send({
            status: 'success',
            data: {
                users
            }
        })

        res.send({
            status: 'success',
            data: createData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })

    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.status(200).send({
            status:'success',
            data:{
                id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:'failed',
            message:'server error'
        })
    }
}