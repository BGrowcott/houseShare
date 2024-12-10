import CreateHouse from "../../components/forms/CreateHouse";
import JoinHouse from "../../components/forms/JoinHouse";

function NewHome() {
	return (
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
	);
}

export default NewHome;
