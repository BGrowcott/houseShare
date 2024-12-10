import AuthService from "../../utils/AuthService";
import { useGlobalContext } from "../../utils/GlobalState";
import HomeView from "./HomeView";
import NewHome from "./NewHome";

function Home() {
	const [state, dispatch] = useGlobalContext();
	const user = AuthService.getProfile();
	const { house } = state;

	return (
		<div className="container-xxl">
			<div className="row">
				{house.hasOwnProperty("name") ? (
                    <HomeView house={house}></HomeView>
				) : (
                    <NewHome></NewHome>
				)}
			</div>
		</div>
	);
}

export default Home;
