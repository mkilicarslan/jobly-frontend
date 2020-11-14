import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./Profile.css";
import JoblyAPI from "../../api/JoblyAPI";

const Profile = ({ currentUser }) => {
	// console.log(currentUser);
	const [message, setMessage] = useState("");
	const formInitialState = {
		firstname: currentUser.first_name || "",
		lastname: currentUser.last_name || "",
		email: currentUser.email || "",
		photoUrl: currentUser.photo_url || "",
		password: "",
	};
	const [form, setForm] = useState({ ...formInitialState });
	const { username } = currentUser;
	const { firstname, lastname, email, password, photoUrl } = form;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!password) {
			setMessage("Please enter your password to update your profile");
			return;
		}

		console.log(form);
		const user = await JoblyAPI.updateProfile({ ...form, username });
		setForm((form) => ({
			...form,
			password: "",
		}));

		if (user) {
			setMessage("You have successfully updated your profile");
		} else {
			setMessage("An error occured");
		}
	};
	console.log(form);
	return (
		<Container className="Profile">
			<h2>Profile</h2>
			{message}
			<Form className="form" onSubmit={handleSubmit}>
				<Col>
					<FormGroup>
						<Label htmlFor="username">Username</Label>
						<p>{username}</p>
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
						<Label htmlFor="lastname">Last Name</Label>
						<Input value={lastname} onChange={handleChange} type="text" name="lastname" id="lastname" />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input value={email} onChange={handleChange} type="email" name="email" id="email" />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label htmlFor="photoUrl">Photo URL</Label>
						<Input value={photoUrl} onChange={handleChange} type="text" name="photoUrl" id="photo" />
					</FormGroup>
				</Col>

				<Col>
					<FormGroup>
						<Label htmlFor="password">Confirm Password</Label>
						<Input value={password} onChange={handleChange} type="password" name="password" id="password" />
					</FormGroup>
				</Col>
				<Button>Submit</Button>
			</Form>
		</Container>
	);
};

export default Profile;
