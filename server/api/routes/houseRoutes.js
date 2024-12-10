const router = require('express').Router();
const {
    getHouses,
    createHouse,
    getHouseForUser,
    updateHouse,
    deleteHouse,
    joinHouse
} = require('../controllers/houseController')

router.route('/').get(getHouseForUser).post(createHouse);

router.route('/join-house').post(joinHouse)

router
  .route('/:id')
  //.get(getHouseForUser)
  .put(updateHouse)
  .delete(deleteHouse);

module.exports = router;