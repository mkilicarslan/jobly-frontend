// import "./Companies.css";
import { useEffect, useState } from "react";
import JoblyAPI from "../../api/JoblyAPI";
import CompanyCard from "./CompanyCard";
import Search from "../search/Search";

function Companies() {
	const [isLoading, setIsLoading] = useState(true);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		async function getCompanies() {
			const companies = await JoblyAPI.getCompanies();
			setCompanies(companies);
		}
		getCompanies();
		setIsLoading(false);
	}, []);

	const handleSearch = async (search) => {
		const companies = await JoblyAPI.getCompanies(search);
		setCompanies(companies);
	};

	return (
		<div className="Companies">
			<h1>Companies</h1>

			<Search handleSearch={handleSearch} />

			{isLoading ? (
				<h2>Loading...</h2>
			) : (
				companies.map((c) => <CompanyCard name={c.name} description={c.description} />)
			)}
		</div>
	);
}

export default Companies;
