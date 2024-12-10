const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
	{
		content: { type: String, required: true },
		post: { type: Schema.Types.ObjectId, ref: "post", unique: true, required: true },
		user: { type: Schema.Types.ObjectId, ref: "user", required: true },
	},
	{
		timestamps: true,
	}
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
