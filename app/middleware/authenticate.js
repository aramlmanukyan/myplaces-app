import jwt from 'jsonwebtoken';
import Constants from '../config/constants';
import db from "../config/sequelize";

const User = db['User'];

export default function authenticate(req, res, next) {

    try {
        const decoded = jwt.verify(req.headers.authorization, Constants.JWT_SECRET);
        const {id, token} = decoded;
        const user = User.findOne({ where: {id, token} });
        if (!user) {
            return res.sendStatus(401);
        }
        req.currentUser = user;
        next();
    } catch(err) {
        return res.sendStatus(401);
    }
}
