const { Schema, model } = require("mongoose");

const noticeBoardSchema = new Schema({
	house: { 
        type: Schema.Types.ObjectId, 
        ref: "house", 
        unique: true,
        required: true,
    },
	posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

const NoticeBoard = model("noticeBoard", noticeBoardSchema);

module.exports = NoticeBoard;
