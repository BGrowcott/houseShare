const { House, User, NoticeBoard, Post, Comment } = require("../../models");

module.exports = {
	async getNoticeBoard(req, res) {
		try {            
			if (!req.user) {
				res.status(401).json({ message: "Please log in" });
				return;
			}

			const board = await NoticeBoard.findById(req.body.boardId)
				.populate({ path: "posts", populate: { path: "comments" } })
				.exec();

			res.json(board);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	async createNoticeBoardPost(req, res) {
		try {
			if (!req.user) {
				res.status(401).json({ message: "Please log in" });
				return;
			}

			const noticeBoard = await NoticeBoard.findById(req.body.boardId);
			const post = await Post.create({
				title: req.body.postTitle,
				content: req.body.postContent,
				user: req.user._id,
			});

			await post.save();
			noticeBoard.posts.push({ _id: post._id });
			await noticeBoard.save();

			res.status(201).json(post);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};
