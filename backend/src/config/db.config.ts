import mongoose from 'mongoose'

const Connect_DB = async()=>{
    try {
        const inst =await mongoose.connect(process.env.MONGO_URI!)
        console.log(`Mongo DB Connected :${inst.connection.host}`)
    } catch (error) {
        console.log('Mongo Error :',error)
        process.exit(1)
        
    }

}

export default Connect_DB   