import { useEffect, useState } from "react";
import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";

const emptyPost = { postTitle: "", postContent: "" };

function NewPost({board, setBoard}) {

    const [newPost, setNewPost] = useState(emptyPost);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const submitPost = async (event) => {
		event.preventDefault();
		if (!AuthService.loggedIn()) {
			return;
		}

		try {
			const res = await fetchWithJWT("/api/noticeBoard/create-post", {
				method: "post",
				body: JSON.stringify({ ...newPost, boardId: board._id }),
			});

			const data = await res.json();

			board.posts.push(data);
			setBoard({ ...board });
			setNewPost({ ...emptyPost });
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div>
			<h3>New Post</h3>
			<form onSubmit={submitPost}>
				<div className="row gy-2">
					<div className="col-12">
						<div className="input-group">
							<label className="input-group-text" htmlFor="noticeBoardPostTitleInput">
								Title
							</label>
							<input
								className="form-control"
								value={newPost.postTitle}
								onChange={handleInput}
								id="noticeBoardPostTitleInput"
								name="postTitle"
							></input>
						</div>
					</div>
					<div className="col-12">
						<div className="input-group">
							<label className="input-group-text" htmlFor="noticeboardPostContentInput">
								Content
							</label>
							<textarea
								className="form-control"
								value={newPost.postContent}
								onChange={handleInput}
								id="noticeboardPostContentInput"
								name="postContent"
							></textarea>
						</div>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-success">
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewPost;
