import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

const Signup = () => {
	const emptyForm = {
		email: "",
		password: "",
		confirmPassword: "",
        username: "",
	};
	const [formState, setFormState] = useState(emptyForm);
	const [errorMessage, setErrorMessage] = useState("");

	const submitForm = async (event) => {
		event.preventDefault();
		try {
			const response = await fetchWithJWT("/api/user/signup", {
				method: "POST",
				body: JSON.stringify(formState),
			});
			const data = await response.json();

			if (response.status !== 200) {
				throw data;
			}

			AuthService.login(data);
		} catch (error) {
			console.log(error);
			setErrorMessage(error.message);
		}
	};

	function handleFormInput(event) {
		setErrorMessage("");
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	}

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={submitForm} className="form">
				<label className="form-label" htmlFor="email-signup">
					Email
				</label>
				<input
					id="email-signup"
					className="form-control"
					type="email"
					name="email"
					onChange={handleFormInput}
					value={formState ? formState.email : ""}
				></input>
				<label className="form-label" htmlFor="username">
					Username
				</label>
				<input className="form-control" type="text" name="username" onChange={handleFormInput} value={formState ? formState.username : ""}></input>
				<label htmlFor="password-signup" className="form-label">
					Password
				</label>
				<input
					className="form-control"
					id="password-signup"
					type="password"
					name="password"
					onChange={handleFormInput}
					value={formState ? formState.password : ""}
				></input>
				<label htmlFor="confirmPassword" className="form-label">
					Confirm Password
				</label>
				<input
					className="form-control"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					onChange={handleFormInput}
					value={formState ? formState.confirmPassword : ""}
				></input>
				<button type="submit" className="mt-2 btn btn-primary">
					Signup
				</button>
			</form>
			<p>{errorMessage}</p>
		</div>
	);
};

export default Signup;
