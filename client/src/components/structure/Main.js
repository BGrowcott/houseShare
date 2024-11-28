import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home";

function Main() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</main>
	);
}
export default Main;