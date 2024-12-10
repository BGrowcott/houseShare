import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home";
import AuthService from "../../utils/AuthService";
import LoginPage from "../../pages/login/LoginPage";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../utils/GlobalState";
import { LOAD_HOUSE } from "../../utils/actions";

function Main() {

	const [state, dispatch] = useGlobalContext();
	
	useEffect(() => {

		if (!AuthService.loggedIn()) {
			return;
		}

		if (state.house) {
			// if exists in the global context we don't need to call the api again
			return;
		}

		(async () => {
			try {
				const res = await fetchWithJWT("/api/house/", {
					method: "get",
				});
				const json = await res.json();
				dispatch({ type: LOAD_HOUSE, house: {...json} });
			} catch (error) {
				console.log({error});
			}
		})();
	}, []);

	return (
		<main>
			<Routes>
				<Route path="/" element={AuthService.loggedIn() ? <Home /> : <LoginPage />} />
			</Routes>
		</main>
	);
}
export default Main;
