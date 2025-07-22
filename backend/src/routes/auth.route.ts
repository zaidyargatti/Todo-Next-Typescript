import { Router } from "express"
import { login, signup } from "../controllers/auth.controller"

const path = Router()

path.post('/signup',signup)
path.post('/login',login)

export default path