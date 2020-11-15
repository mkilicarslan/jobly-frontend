// import "./Companies.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JoblyAPI from "../../api/JoblyAPI";
import CompanyCard from "./CompanyCard";
import Search from "../search/Search";

function Companies() {
	const [isLoading, setIsLoading] = useState(true);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		const getCompanies = async () => {
			const companies = await JoblyAPI.getCompanies();
			setCompanies(companies);
		};
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
				companies.map((c) => (
					<Link to={`/companies/${c.handle}`}>
						<CompanyCard key={c.handle} name={c.name} description={c.description} />
					</Link>
				))
			)}
		</div>
	);
}

export default Companies;
