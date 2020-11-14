import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
// import "./NavBar.css";

function NavBar({ token, setAuthToken }) {
	const history = useHistory();
	const handleLogout = () => {
		setAuthToken("");
		history.push("/login");
	};
	return (
		<Navbar expand="md">
			<NavLink exact to="/" className="navbar-brand">
				Jobly
			</NavLink>

			{token ? (
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink to="/companies">Companies</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/jobs">Jobs</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/profile">Profile</NavLink>
					</NavItem>
					<NavItem onClick={handleLogout}>
						<NavLink to="/logout">Logout</NavLink>
					</NavItem>
				</Nav>
			) : (
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink to="/login">Login</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/register">Register</NavLink>
					</NavItem>
				</Nav>
			)}
		</Navbar>
	);
}

export default NavBar;

// function NavBar() {
// 	return (
// 		<div>
// 			<Navbar expand="md">
// 				<NavLink exact to="/" className="navbar-brand">
// 					Jobly
// 				</NavLink>

// 				<Nav className="ml-auto" navbar>
// 					<NavItem>
// 						<NavLink to="/">Home</NavLink>
// 					</NavItem>
// 					<NavItem>
// 						<NavLink to="/drinks">Drinks</NavLink>
// 					</NavItem>
// 					<NavItem>
// 						<NavLink to="/new-item">Add New</NavLink>
// 					</NavItem>
// 				</Nav>
// 			</Navbar>
// 		</div>
// 	);
// }
