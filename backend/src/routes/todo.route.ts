import { Router } from "express"
import protect from "../middleware/auth.middleware"
import { CreateTodo, DeleteTodo, GetTodos, UpdateTodo } from "../controllers/todo.controller"

const way =Router()
way.use(protect)
way.get('/get-todos',GetTodos)
way.post('/create-todo',CreateTodo)
way.put('/update-todo/:id',UpdateTodo)
way.delete('/delete-todo/:id',DeleteTodo)

export default way
