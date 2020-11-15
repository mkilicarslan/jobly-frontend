import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function PrivateRoute({ exact, path, children }) {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) {
		return <Redirect to="/login" />;
	}

	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
}

export default PrivateRoute;
