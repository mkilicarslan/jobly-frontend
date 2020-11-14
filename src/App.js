import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { decode } from "jsonwebtoken";
import NavBar from "./components/_layout/NavBar";
import Home from "./components/Home";
import Companies from "./components/company/Companies";
import Company from "./components/company/Company";
import Jobs from "./components/job/Jobs";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import "./App.css";
import JoblyApi from "./api/JoblyAPI";

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
	const didMount = useRef(false);
	useEffect(() => {
		if (didMount) {
			localStorage.setItem("token", authToken);
		} else {
			authToken = localStorage.getItem("token");
			didMount.current = true;
		}
	}, [authToken]);

	useEffect(() => {
		const getCurrentUser = async () => {
			if (authToken) {
				const { username } = decode(authToken);
				const currentUser = await JoblyApi.getCurrentUser(username);
				setCurrentUser(currentUser);
			} else {
				setCurrentUser({});
			}
		};
		getCurrentUser();
	});

	function renderCurrentCompany(props) {
		const { companyName } = props.match.params;
		const company = { name: companyName };
		return <Company {...props} company={company} />;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar token={authToken} setAuthToken={setAuthToken} />
				<div class="col-sm-12 col-md-6 offset-md-3">
					{authToken ? (
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/companies">
								<Companies />
							</Route>
							<Route path="/companies/:companyName" render={renderCurrentCompany} />
							<Route exact path="/jobs">
								<Jobs currentUser={currentUser} />
							</Route>
							<Route exact path="/login">
								<Login setAuthToken={setAuthToken} />
							</Route>
							<Route exact path="/register">
								<Register />
							</Route>
							<Route exact path="/profile">
								<Profile currentUser={currentUser} />
							</Route>
							<Redirect to="/" />
						</Switch>
					) : (
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/login">
								<Login setAuthToken={setAuthToken} />
							</Route>
							<Route exact path="/register">
								<Register />
							</Route>
							<Redirect to="/" />
						</Switch>
					)}
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
