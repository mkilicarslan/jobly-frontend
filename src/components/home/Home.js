import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import AuthContext from "../../context/AuthContext";
// import "./Home.css";

function Home() {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="Home">
			<h1>Home</h1>
			<p>All the jobs in one, convenient place.</p>
			{currentUser ? (
				`Welcome Back Muhammed!`
			) : (
				<Link to="/login">
					<Button>Log in</Button>
				</Link>
			)}
		</div>
	);
}

export default Home;
