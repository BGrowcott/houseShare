import Signup from "../../components/forms/Signup";
import Login from "../../components/forms/Login";

function LoginPage() {
	return (
		<div className="container-xxl">
			<div className="row">
				<div className="col-12 col-lg-6">
					<Login></Login>
				</div>
				<div className="col-12 col-lg-6">
					<Signup></Signup>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
