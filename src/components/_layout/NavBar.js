import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import AuthContext from "../../context/AuthContext";
// import "./NavBar.css";

const NavBar = () => {
	const history = useHistory();
	const { currentUser, setCurrentUser, setAuthToken } = useContext(AuthContext);

	const handleLogout = () => {
		setAuthToken(null);
		setCurrentUser(null);
		history.push("/login");
	};

	return (
		<Navbar expand="md">
			<Link exact to="/" className="navbar-brand">
				Jobly
			</Link>

			{currentUser ? (
				<Nav className="ml-auto" navbar>
					<NavItem className="mr-4">
						<NavLink to="/companies">Companies</NavLink>
					</NavItem>
					<NavItem className="mr-4">
						<NavLink to="/jobs">Jobs</NavLink>
					</NavItem>
					<NavItem className="mr-4">
						<NavLink to="/profile">Profile</NavLink>
					</NavItem>
					<NavItem onClick={handleLogout}>
						<NavLink to="/logout">Logout</NavLink>
					</NavItem>
				</Nav>
			) : (
				<Nav className="ml-auto" navbar>
					<NavItem className="mr-4">
						<NavLink to="/login">Login</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/register">Register</NavLink>
					</NavItem>
				</Nav>
			)}
		</Navbar>
	);
};

export default NavBar;
