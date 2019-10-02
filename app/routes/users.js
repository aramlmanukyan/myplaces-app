import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/user.controller';
import authenticate from '../middleware/authenticate';

router
    // .get('/', userCtrl.listAllUsers)
    .get('/me', authenticate, userCtrl.getCurrentUser)
    .post('/signup', userCtrl.create)
    .post('/signin', userCtrl.userAuth)
    .post('/avatar', userCtrl.avatar);
    // .delete('/:id', userCtrl.deleteUser)
    // .put('/:id', userCtrl.updateUserInfo)



export default router;