import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./Login.css";
import JoblyAPI from "../../api/JoblyAPI";

const Login = () => {
	const history = useHistory();
	const [message, setMessage] = useState("");
	const [form, setForm] = useState({});
	const { username, password, firstname, lastname, email } = form;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await JoblyAPI.register(form);
		console.log(token);
		if (token) {
			localStorage.setItem("token", token);
			history.push("/jobs");
		} else {
			setMessage("An error occured");
		}
	};

	return (
		<Container className="Login">
			<h2>Register</h2>
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
				<Col>
					<FormGroup>
						<Label htmlFor="firstname">First Name</Label>
						<Input value={firstname} onChange={handleChange} type="text" name="firstname" id="firstname" />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label htmlFor="firstname">Last Name</Label>
						<Input value={lastname} onChange={handleChange} type="text" name="lastname" id="lastname" />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input value={email} onChange={handleChange} type="email" name="email" id="email" />
					</FormGroup>
				</Col>
				<Button>Submit</Button>
			</Form>
		</Container>
	);
};

export default Login;
