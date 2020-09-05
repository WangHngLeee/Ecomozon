import jwt from "jsonwebtoken";
import config from './config';
import { read } from "fs";
const getToken = (user) => {
    return jwt.sign({
        _id:user._id,
        email: user.email,
        password: user.password
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req,res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7,token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err,decode)=> {
            if(err){
                return res.status(401).send({msg: 'Invalid Token'});
            }
            req.use = token;
            next();
            return
        });
    }
    return read.status(401).send({msg: "Token is not supplied"})
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg: "Token is not valid"});
}
export {getToken,isAdmin,isAuth};