import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import JoblyAPI from "../../api/JoblyAPI";

function JobCard({ id, title, salary, jobStatus }) {
	const [status, setStatus] = useState(jobStatus);
	const handleApply = async (e) => {
		e.preventDefault();
		const res = await JoblyAPI.applyToJob(id);
		console.log(res);
		setStatus(res);
	};
	return (
		<Card>
			<CardBody>
				<CardTitle tag="h5">{title}</CardTitle>
				<CardText>{salary}</CardText>
				<Button onClick={handleApply} color="success">
					{status === "applied" ? "Applied" : "Apply"}
				</Button>
			</CardBody>
		</Card>
	);
}

export default JobCard;
