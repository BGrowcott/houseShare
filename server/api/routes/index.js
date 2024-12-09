const router = require('express').Router();
const exampleRoutes = require('./exampleRoutes');
const userRoutes = require('./userRoutes');
const houseRoutes = require('./houseRoutes');

router.use('/examples', exampleRoutes);
router.use('/user', userRoutes);
router.use('/house', houseRoutes);

module.exports = router;