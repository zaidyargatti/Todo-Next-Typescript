import { Request,Response } from "express"
import Todo from "../models/todo.model"
import { todo } from "node:test"

const GetTodos = async(req:Request , res:Response)=>{
   try {
    const UserId = req.user.id
    const todos = await Todo.find({user: UserId})
    res.status(201)
    .json(todos)
   } catch (error) {
    res.status(500)
    .json({
        msg:'FETCHING ERROR'
    })
    console.log(error)
   }
}

const CreateTodo = async( req:Request , res:Response)=>{
     try {
        const { task, duedate } = req.body
        const NewTod = await Todo.create({
            user:req.user.id,
            task,
            duedate
        })
        res.status(201)
        .json(NewTod)
     } catch (error) {
        res.status(500)
        .json({
            msg:'CREARION FALIED'
        })
        console.log(error)
     }
}

const UpdateTodo = async( req:Request , res:Response)=>{
    try {
        const todoId = req.params.id
        const todo = await Todo.findById(todoId)
        if(!todo) {
            return res.status(404)
            .json({
                msg:'NO TODOS FOUND'
            })
        }
        if (todo.user.toString() !== req.user.id) {
             return res.status(403)
             .json({
                 msg: 'Unauthorized' 
                });
        }
        const updated = await Todo.findByIdAndUpdate(todoId, req.body, {
            new:true
        })
        res.status(201)
        .json(updated)
        
    } catch (error) {
        res.status(500)
        .json({
            msg:'FAILED TO UPDATE'
        })
        console.log(error)
    }
}

const DeleteTodo = async( req:Request , res:Response)=>{
    try {
        const todoId = req.params.id
        const todo = await Todo.findById(todoId)
        if(!todo){
            return res.status(404)
            .json({
                msg:'TODO NOT FOUND'
            })
        }
        if(todo.user.toString() !== req.user.id){
            return res.status(403)
            .json({
                msg:'UNAUTHORIZED'
            })
        }
        await todo.deleteOne()
        res.status(201)
        .json({
            msg:'DELETED'
        })
    } catch (error) {
        res.status(500)
        .json({
            msg:'FAILED TO DELETE'
        })
        console.log(error)
    }
}

export {
    GetTodos,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}