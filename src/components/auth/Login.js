import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./Login.css";
import JoblyAPI from "../../api/JoblyAPI";

const Login = ({ setAuthToken }) => {
	const history = useHistory();
	const [message, setMessage] = useState("");
	const [form, setForm] = useState({});
	const { username, password } = form;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await JoblyAPI.login({ username, password });
		if (token) {
			setAuthToken(token);
			history.push("/");
		} else {
			setMessage("Invalid credentials");
		}
	};

	return (
		<Container className="Login">
			<h2>Sign In</h2>
			{message}
			<Form className="form" onSubmit={handleSubmit}>
				<Col>
					<FormGroup>
						<Label htmlFor="username">Username</Label>
						<Input value={username} onChange={handleChange} type="text" name="username" id="username" />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label htmlFor="password">Password</Label>
						<Input value={password} onChange={handleChange} type="password" name="password" id="password" />
					</FormGroup>
				</Col>
				<Button>Submit</Button>
			</Form>
		</Container>
	);
};

export default Login;
