function HomeView({ house }) {
	return (
		<div> <div>
			<h1>{house.name}</h1>
			<p>{house.about}</p>
            </div>
            <div>
                <h2>House Members</h2>
                <ul>
                    {house.houseMembers.map(it => <li key={it.username}>{it.username}</li>)}
                </ul>
            </div>
		</div>
	);
}

export default HomeView;
