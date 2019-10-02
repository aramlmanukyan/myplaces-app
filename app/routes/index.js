import express from 'express';
const router = express.Router();

const renderIndexPage = (req, res, next)=> {
    res.render('index', { title: 'Express' });
};

router.get('/', renderIndexPage);

export default router;