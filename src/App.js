import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { decode } from "jsonwebtoken";
import NavBar from "./components/_layout/NavBar";
import Routes from "./components/_route/Routes";
import "./App.css";
import JoblyApi from "./api/JoblyAPI";
import AuthContext from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { AUTH_TOKEN_STORAGE_ID } from "./constant/localStorage";
import { Spinner } from "reactstrap";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_STORAGE_ID);
	const [isUserLoading, setIsUserLoading] = useState(false);
	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const { username } = decode(authToken);
				const currentUser = await JoblyApi.getCurrentUser(username);
				console.log("setCurrentUser", currentUser);
				setCurrentUser(currentUser);
			} catch (err) {
				setCurrentUser(null);
			}
			setIsUserLoading(true);
		};
		setIsUserLoading(false);
		getCurrentUser();
	}, [authToken]);

	return (
		<div className="App">
			{!isUserLoading ? (
				<Spinner animation="border" variant="warning" />
			) : (
				<BrowserRouter>
					<AuthContext.Provider value={{ currentUser, setCurrentUser, setAuthToken }}>
						<NavBar />
						<div className="col-sm-12 col-md-6 offset-md-3">
							<Routes />
						</div>
					</AuthContext.Provider>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
