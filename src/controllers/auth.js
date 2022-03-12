const { user } = require('../../models')

//import package joi
const Joi = require('joi')

exports.register = async (req, res) => {
    try {
        const data = req.body

        // blueprint pengecekan ketentuan
        const schema = Joi.object({
            fullname: Joi.string().min(5).required(),
            email: Joi.string().email().min(5).required(),
            password: Joi.string().min(5).required(),
            role: Joi.string().required()
        })

        // cek data dengan ketentuan
        const { error } = schema.validate(data)

        if (error) {
            return res.status(400).send({
                status: 'Error',
                message: error.details[0].message
            })
        }

        const newUser = await user.create({
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            role: data.role
        })

        res.status(201).send({
            status: 'success',
            data: {
                email: newUser.email,

            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}