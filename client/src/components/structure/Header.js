import AuthService from "../../utils/AuthService";

function Header() {
	let user = {};

	if (AuthService.loggedIn()) {
		user = AuthService.getProfile().data;
	}
	const logout = (e) => {
		e.preventDefault();
		AuthService.logout();
		window.location.replace("/");
	};

	console.log();

	return (
		<header className="bg-dark text-center text-white fs-4 p-3">
			<div className="d-flex justify-content-between align-items-center">
				<h1 className="m-0">Hello {user.username}</h1>
				<button className="btn btn-secondary" onClick={logout}>
					Log out
				</button>
			</div>
		</header>
	);
}

export default Header;
