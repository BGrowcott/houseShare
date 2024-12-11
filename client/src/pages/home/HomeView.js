import NoticeBoard from "./NoticeBoard";

function HomeView({ house }) {
	return (
		<div>
			<div>
				<h1>{house.name}</h1>
				<p>{house.about}</p>
			</div>
			<div className="row">
				<div className="col-12 col-md-3">
					<h2>House Members</h2>
					<ul>
						{house.houseMembers.map((it) => (
							<li key={it.username}>{it.username}</li>
						))}
					</ul>
				</div>
				<div className="col-12 col-md-9">
					<NoticeBoard></NoticeBoard>
				</div>
			</div>
		</div>
	);
}

export default HomeView;
