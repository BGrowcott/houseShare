import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalState";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import Main from "./components/structure/Main";

function App() {
  return (
		<Router>
			<GlobalProvider>
				<Header />
				<Main />
				<Footer />
			</GlobalProvider>
		</Router>
	);
}

export default App;
