import CreateHouse from "../../components/forms/CreateHouse";
import JoinHouse from "../../components/forms/JoinHouse";
import AuthService from "../../utils/AuthService";
import { useGlobalContext } from "../../utils/GlobalState";

function Home() {
	const [state, dispatch] = useGlobalContext();
	const user = AuthService.getProfile();

	const { house } = state;

	return (
		<div className="container-xxl">
			<div className="row">
				{house.hasOwnProperty("name") ? (
					<div>
						<h1>{house.name}</h1>
						<p>{house.about}</p>
					</div>
				) : (
					<div>
						<div className="bg-light p-3 border rounded my-5">
							<h2 className="h4">Start new house</h2>
							<CreateHouse></CreateHouse>
						</div>
						Or
						<div className="bg-light p-3 border rounded my-5">
							<h2 className="h4">Join house</h2>
							<JoinHouse></JoinHouse>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
