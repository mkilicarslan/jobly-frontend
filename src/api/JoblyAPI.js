import axios from "axios";
import { AUTH_TOKEN_STORAGE_ID } from "../constant/localStorage";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
	static async request(endpoint, paramsOrData = {}, verb = "get") {
		const token = localStorage.getItem(AUTH_TOKEN_STORAGE_ID);
		paramsOrData._token = token;

		// for now, hardcode token for "testing"
		// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
		// "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
		// "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U";

		console.debug("API Call:", endpoint, paramsOrData, verb);

		try {
			return (
				await axios({
					method: verb,
					url: `${BASE_URL}/${endpoint}`,
					[verb === "get" ? "params" : "data"]: paramsOrData,
				})
			).data;
			// axios sends query string data via the "params" key,
			// and request body data via the "data" key,
			// so the key we need depends on the HTTP verb
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	static async getCompanies(search) {
		const params = {};
		if (search) {
			params["search"] = search;
		}

		const res = await this.request(`companies`, params);
		return res.companies;
	}

	static async getCompany(handle) {
		const res = await this.request(`companies/${handle}`);
		return res.company;
	}

	static async getJobs(search) {
		const params = {};
		if (search) {
			params["search"] = search;
		}

		const res = await this.request(`jobs`, params);
		return res.jobs;
	}

	static async getJob(id) {
		const res = await this.request(`jobs/${id}`);
		return res.job;
	}

	static async login({ username, password }) {
		try {
			const params = { username, password };
			const res = await this.request(`login`, params, "post");
			return res.token;
		} catch (err) {
			return undefined;
		}
	}

	static async register({ username, password, firstname, lastname, email }) {
		try {
			const params = {
				username,
				password,
				first_name: firstname,
				last_name: lastname,
				email,
			};
			const res = await this.request(`users`, params, "post");
			return res._token;
		} catch (err) {
			return undefined;
		}
	}

	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	static async updateProfile({ username, password, firstname, lastname, email, photoUrl }) {
		const params = {
			password,
			first_name: firstname,
			last_name: lastname,
			email,
			photo_url: photoUrl,
		};

		let res = await this.request(`users/${username}`, params, "patch");
		return res.user;
	}

	static async applyToJob(jobId) {
		let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
		return res.message;
	}
}

export default JoblyApi;
