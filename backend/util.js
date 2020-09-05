import jwt from "jsonwebtoken";
import config from './config';
const getToken = (user) => {
    return jwt.sign({
        _id:user._id,
        email: user.email,
        password: user.password
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}
export {getToken};