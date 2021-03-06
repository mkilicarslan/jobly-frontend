// import "./Jobs.css";
import { useEffect, useState, useContext } from "react";
import JoblyAPI from "../../api/JoblyAPI";
import JobCard from "../job/JobCard";
import Search from "../search/Search";
import AuthContext from "../../context/AuthContext";

function Jobs() {
	const { currentUser } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const getJobs = async () => {
			const jobs = await JoblyAPI.getJobs();
			setJobs(jobs);
		};
		getJobs();
		setIsLoading(false);
	}, []);

	const handleSearch = async (search) => {
		const jobs = await JoblyAPI.getJobs(search);
		setJobs(jobs);
	};

	return (
		<div className="Jobs">
			<h1>Jobs</h1>

			<Search handleSearch={handleSearch} />

			{isLoading ? (
				<h2>Loading...</h2>
			) : (
				jobs.map((j) => (
					<JobCard
						id={j.id}
						title={j.title}
						salary={j.salary}
						jobStatus={currentUser.jobs.map((j) => j.id).includes(j.id) ? "applied" : ""}
					/>
				))
			)}
		</div>
	);
}

export default Jobs;
