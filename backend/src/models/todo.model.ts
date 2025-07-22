import mongoose, {Document,Schema} from 'mongoose';

export interface Itodo extends Document{
    user:String,
    task:String,
    duedate:Date
}

const TaskSchema = new Schema<Itodo>({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    task:{
        type:String,
        required:true
    },
    duedate:{
        type:Date,
        required:true
    }
},{timestamps:true})

const Todo = mongoose.model<Itodo>('Task',TaskSchema)
export default Todo
