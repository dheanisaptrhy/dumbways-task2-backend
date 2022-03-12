const { user } = require('../../models')

//import package joi
const Joi = require('joi')
// import package bcrypt
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const data = req.body
        //bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        // cek data dengan ketentuan
        
        // blueprint pengecekan ketentuan
        const schema = Joi.object({
            fullname: Joi.string().min(5).required(),
            email: Joi.string().email().min(5).required(),
            password: Joi.string().min(5).required()
        })
        
        const { error } = schema.validate(data)
        if (error) {
            return res.status(400).send({
                status: 'Error',
                message: error.details[0].message
            })
        }

        //cek misal emailnya sudah digunakan
        const userExist = await user.findOne({
            where:{
                email:data.email
            },
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            }
        })
        if(userExist){
            return res.status(400).send({
                status:'failed',
                message:'Email has already taken, just like your crush'
            })
        }
        
        //masukkan ke database
        const newUser = await user.create({
            fullname: data.fullname,
            email: data.email,
            password: hashedPassword,
            role: 'user'
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