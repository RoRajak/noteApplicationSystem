import jwt from 'jsonwebtoken';

const jwtVerify=async(req,res,next)=>{
    const token=req.header("Authorization").replace("Bearer ","")
    console.log(token)

    if (!token) {
        return res.json({msg:"no token, authorization denied"})
        
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.user;
        next()
    } catch (error) {
        res.status(401).json({msg:'token is not valid'})
    }
}
export default jwtVerify
