import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home";
import AuthService from "../../utils/AuthService";
import LoginPage from "../../pages/login/LoginPage";

function Main() {
	return (
		<main>
			<Routes>
				<Route path="/" element={AuthService.loggedIn() ? <Home /> : <LoginPage />} />
			</Routes>
		</main>
	);
}
export default Main;