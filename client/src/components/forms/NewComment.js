import { useState } from "react";
import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";

import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NewComment({ post, board, setBoard }) {
	const [comment, setComment] = useState("");

	const handleInput = (event) => {
		setComment(event.target.value);
	};

	const submitComment = async (event) => {
		event.preventDefault();
		if (!AuthService.loggedIn()) {
			return;
		}

		try {
			const res = await fetchWithJWT("/api/noticeBoard/create-comment", {
				method: "post",
				body: JSON.stringify({ postId: post._id, commentContent: comment }),
			});

			const data = await res.json();

			post.comments.push(data);
			setBoard({ ...board });
			setComment("");
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div>
			<form onSubmit={submitComment}>
				<div className="input-group">
					<label className="input-group-text">Comment</label>
					<textarea value={comment} onChange={handleInput} name="content" className="form-control"></textarea>
					<div className="input-group-text bg-success">
						<button className="btn btn-success btn-sm">
							<FontAwesomeIcon className="fs-4" icon={solid("square-caret-right")} />
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewComment;
