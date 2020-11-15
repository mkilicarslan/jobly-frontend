import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Companies from "../company/Companies";
import Company from "../company/Company";
import Jobs from "../job/Jobs";
import Profile from "../profile/Profile";
import PrivateRoute from "./PrivateRoute";

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>

			<PrivateRoute exact path="/companies">
				<Companies />
			</PrivateRoute>
			<PrivateRoute path="/companies/:handle">
				<Company />
			</PrivateRoute>
			<PrivateRoute exact path="/jobs">
				<Jobs />
			</PrivateRoute>
			<PrivateRoute exact path="/profile">
				<Profile />
			</PrivateRoute>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
