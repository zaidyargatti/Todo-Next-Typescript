import jwt from 'jsonwebtoken';

const generate= (id: String)=>{
return jwt.sign({id},process.env.JWT_SECRET!,{
    expiresIn:'1d',
})
}

export default generate