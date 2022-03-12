const {user} =require('../../models')

exports.addUser = async (req,res)=>{
    try {
        const data =req.body
        const createData = await user.create(data)

        res.send({
            status:'success',
            data:createData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:'failed',
            message:'server error'
        })
        
    }
}