import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user.model"

interface Decoded {
    id: string
}

const protect = async (req: Request , res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401)
            .json({
                msg: 'NO TOKEN PROVIDED! '
            })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Decoded;
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(401)
                .json({
                    msg: 'USER NOT FOUND!'
                })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401)
            .json({
                msg: 'INVALID TOKEN!'
            })
        console.log(error)
    }
}

export default protect