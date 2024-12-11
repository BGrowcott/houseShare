import { useEffect, useState } from "react";
import AuthService from "../../utils/AuthService";
import { useGlobalContext } from "../../utils/GlobalState";
import fetchWithJWT from "../../utils/fetchWithJWT";
import NewPost from "../../components/forms/NewPost";
import NewComment from "../../components/forms/NewComment";

function NoticeBoard() {
	const [state, dispatch] = useGlobalContext();
	const user = AuthService.getProfile();
	const { house } = state;

	const [board, setBoard] = useState({ posts: [] });

	useEffect(() => {
		if (!AuthService.loggedIn()) {
			return;
		}

		if (!house) {
			return;
		}

		(async () => {
			try {
				const res = await fetchWithJWT("/api/noticeBoard/get-notice-board", {
					method: "post",
					body: JSON.stringify({ boardId: house.noticeBoard }),
				});
				const noticeBoard = await res.json();
				setBoard(noticeBoard);
			} catch (error) {
				console.log({ error });
			}
		})();
	}, []);

	return (
		<div className="bg-light border border-5 p-3 rounded">
			<h2>Notice Board</h2>
			<div className="bg-white p-3 shadow-inset rounded border border-2 border-dark">
				{board.posts?.length ? "" : "No posts"}
				<div>
					{board.posts?.map((post) => (
						<div className="my-2" key={post._id}>
							<div className="card">
								<div className="card-header fw-bold">{post.title}</div>
								<div className="card-body">
									<p className="card-text">{post.content}</p>
									<p></p>
									<hr></hr>

									<div>
										<h4 className="h6 fw-bold">Comments:</h4>
										{post.comments.map((comment) => (
											<div key={comment._id} className="p-3 border-bottom">
												<p>{comment.content}</p>
											</div>
										))}
									</div>
								</div>

								<div className="card-footer">
									<NewComment post={post} board={board} setBoard={setBoard}></NewComment>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<NewPost board={board} setBoard={setBoard}></NewPost>
			</div>
		</div>
	);
}

export default NoticeBoard;
