import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/JoblyAPI";
import AuthContext from "../../context/AuthContext";
import JobCard from "../job/JobCard";

function Company() {
	const { handle } = useParams();
	const { currentUser } = useContext(AuthContext);
	const [company, setCompany] = useState(null);

	useEffect(() => {
		const getCompanyAndJobs = async () => {
			const { jobs } = currentUser;
			const company = await JoblyApi.getCompany(handle);

			const appliedJobsIDs = new Set(jobs.map((job) => job.id));

			company.jobs = company.jobs.map((job) => ({
				...job,
				status: appliedJobsIDs.has(job.id) ? "applied" : null,
			}));
			setCompany(company);
		};

		getCompanyAndJobs();
	}, [handle, currentUser]);

	if (!company) {
		return <div>Loading...</div>;
	}

	const { name, description, jobs } = company;

	return (
		<div className="col-md-8 offset-md-2">
			<h5 className="text-capitalize">{name}</h5>
			<p>{description}</p>
			{jobs.map((j) => (
				<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} jobStatus={j.status} />
			))}
		</div>
	);
}

export default Company;
