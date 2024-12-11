const router = require('express').Router();
const exampleRoutes = require('./exampleRoutes');
const userRoutes = require('./userRoutes');
const houseRoutes = require('./houseRoutes');
const noticeBoardRoutes = require('./noticeBoardRoutes');

router.use('/examples', exampleRoutes);
router.use('/user', userRoutes);
router.use('/house', houseRoutes);
router.use('/noticeBoard', noticeBoardRoutes);

module.exports = router;