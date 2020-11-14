import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function Search({ handleSearch }) {
	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		const { value } = e.target;
		setSearch(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleSearch(search);
	};

	return (
		<Form className="form-inline mb-4" onSubmit={handleSubmit}>
			<Input
				value={search}
				className="form-control form-control-lg flex-grow-1"
				onChange={handleChange}
				type="text"
				name="search"
				id="search"
				placeholder="Search"
			/>
			<Button type="submit" className="btn btn-lg btn-primary">
				Submit
			</Button>
		</Form>
	);
}

export default Search;
