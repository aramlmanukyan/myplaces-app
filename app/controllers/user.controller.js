import bcrypt from 'bcrypt';
import crypto from 'crypto';
import md5 from 'md5';
import multer from "multer";

import BaseController from './base.controller';
import db from '../config/sequelize';
import constants from '../config/constants';

const User = db['User'];

class UserController extends BaseController {

    whitelist = [
        'name',
        'type',
        'email',
        'password',
        'avatar',
        'social_token',
        'social_type'
    ];

    randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    generateToken = () => {
        const toToken = this.randomInt(100, 10000).toString();
        return crypto.createHash('md5').update(toToken).digest('hex');
    };

    create = async (req, res, next) => {
        const params = this.filterParams(req.body, this.whitelist);

        if (!params.email.trim() || !params.password.trim()) {
            const err = {
                status: 417,
                key: constants.ERR_RESPONSE.EMPTY_EMAIL_OR_PASS
            };
            return next(err);
        }

        if (!params.type) {
            const err = {
                status: 417,
                key: constants.ERR_RESPONSE.EMPTY_TYPE
            };
            return next(err);
        }

        if (params.type == constants.USER_TYPES.REGULAR) {
            if (!params.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
                const err = {
                    status: 417,
                    key: constants.ERR_RESPONSE.WRONG_PASSWORD_FORMAT
                };
                return next(err);
            }
            params.password = await bcrypt.hash(params.password, constants.SALT_ROUNDS);
        } else {
            params.password = constants.SOCIAL_USER;
            if (!params.social_token) {
                const err = {
                    status: 417,
                    key: constants.ERR_RESPONSE.EMPTY_SOCIAL_TOKEN
                };
                return next(err);
            }

            const user = await User.findOne({where: {'social_token': params.social_token}});
            if (user)
                return this.socialAuth(user.id, req, res, next);
        }
        this.logForTest(params);

        params.token = this.generateToken();

        const newUser = {...params}; //for add additional field if need

        try {
            const savedUser = await User.create(newUser);
            delete savedUser.dataValues.password;
            res.status(201).json(savedUser);
        } catch (err) {
            this.logForTest(err);

            if (err.name == "SequelizeUniqueConstraintError") {
                const err = {
                    status: 417,
                    key: constants.ERR_RESPONSE.EMAIL_IS_TAKEN
                };
                return next(err);
            }

            err.status = 417;
            err.key = constants.DB_ERROR;
            next(err);
        }
    };

    avatar = async (req, res, next) => {

        const now = Date.now();
        const storage = this.storage(constants.DIRS.AVATAR, now);

        const upload = multer({storage: storage}).single('avatar');
        upload(req, res, async (err) => {

            let {id} = req.body;
            try {
                id = parseInt(id);
            } catch (e) {
                const custom_error = {
                    status: 417,
                    key: constants.ERR_RESPONSE.INVALID_ID
                };
                return next(custom_error);
            }

            if (err) { //todo check only image types
                console.error(err.code);
                const custom_error = {
                    status: 417,
                    key: constants.ERR_RESPONSE[err.code]
                };
                return next(custom_error);
            }

            try {
                const me = await User.update(
                    {avatar: now + req.file.originalname},
                    {where: {id}}
                );

                res.sendStatus(201)

            } catch (err) {
                err.status = 417;
                err.key = constants.DB_ERROR;
                next(err);
            }


        });

    };

    socialAuth = async (user_id, req, res, next) => {
        const token = this.generateToken();
        try {
            const me = await User.update(
                {token: token},
                {where: {id: user_id}}
            );
            const user = await User.findOne({where: {id: user_id}});
            delete user.dataValues.password;
            //todo return user, social_type
            res.status(201).json(user);

        } catch (err) {
            err.status = 417;
            err.key = constants.DB_ERROR;
            next(err);
        }

    }

    userAuth = async (req, res, next) => {

        const {email, password} = req.body;

        try {
            const user = await User.findOne({where: {email: email}});

            if (!user) {
                const err = {};
                err.status = 400;
                err.key = constants.ERR_RESPONSE.WRONG_EMAIL_OR_PASSWORD;
                next(err);
            }


            const isPasswordTrue = await bcrypt.compare(password, user.dataValues.password);
            if(!isPasswordTrue){
                const err = {};
                err.status = 400;
                err.key = constants.ERR_RESPONSE.WRONG_EMAIL_OR_PASSWORD;
                next(err);
            }

            const token = this.generateToken(),
                id = user.dataValues.id;

            const me = await User.update(
                {token: token},
                {where: {id: id}}
            );

            delete user.dataValues.password;
            //todo return user, social_type
            res.status(202).json(user);


        } catch (err) {
            err.status = 417;
            err.key = constants.DB_ERROR;
            next(err);
        }

    }

    getCurrentUser = async (req, res, next) => {
        try {
            const me = User.findOne({where: {id: req.currentUser.id}});
            res.status(200).json(me);
        } catch (err) {
            err.status = 417;
            err.key = constants.DB_ERROR;
            next(err);
        }
    }

}

export default new UserController();

//todo avatar, auth, crud