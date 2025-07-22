import mongoose, {Document,Schema} from "mongoose";

export interface IUser extends Document{
    _id:string
    name: string,
    email: string,
    password: string,
}

const Userschema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongoose.model<IUser>('User',Userschema)
export default User