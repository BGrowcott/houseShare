const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		user: { type: Schema.Types.ObjectId, ref: "user" },
		comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
	},
	{
		timestamps: true,
	}
);

const Post = model("post", postSchema);

module.exports = Post;
