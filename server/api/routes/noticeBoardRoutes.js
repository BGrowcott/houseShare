const router = require('express').Router();
const {
    getNoticeBoard,
    createNoticeBoardPost,
    createComment,
    // getSingleNoticeBoardPost,
    // updateNoticeBoardPost,
    // deleteNoticeBoardPost
} = require('../controllers/noticeBoardController')

router.route('/create-post').post(createNoticeBoardPost);
router.route('/create-comment').post(createComment);
router.route('/get-notice-board').post(getNoticeBoard);

//router
//   .route('/:id')
//   .get(getSingleNoticeBoardPost)
//   .put(updateNoticeBoardPost)
//   .delete(deleteNoticeBoardPost);

module.exports = router;