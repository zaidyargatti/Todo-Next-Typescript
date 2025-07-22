import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Connect_DB from "./config/db.config"
import path from "./routes/auth.route"
import way from "./routes/todo.route"

declare global{
   namespace Express {
    interface Request {
        user?:any
    }
   }
}



dotenv.config()
Connect_DB()
const app = express()
app.use(cors())
app.use(express.json())

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Tasks', path: '/todo' },
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' }
];

app.get('/menu', (req, res) => {
  res.json(menuItems);
});



app.use('/user',path)
app.use('/todo',way)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
