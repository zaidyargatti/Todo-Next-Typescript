import { Request, Response } from "express"
import User from "../models/user.model"
import generate from "../utils/generatetoken.util"
import bcrypt from "bcryptjs"

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(401)
                .json({
                    msg: ' USER ALREADY EXIST !'
                })
        }
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashed
        })
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: generate(user._id.toString()),
        })
    } catch (error) {
        res.status(500)
            .json({
                msg: 'SIGNUP FAILED '
            })
        console.log(error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400)
                .json({
                    msg: 'INVALID CREDENTIALS'
                })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400)
                .json({
                    msg: 'INVALID CREDENTIALS'
                });
        }

        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
            token: generate(user._id.toString()),
        });
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                msg: 'LOGIN FAILED ',error
    
            })
    }
}

export {
    signup,
    login
}