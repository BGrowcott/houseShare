import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

function CreateHouse() {
	const emptyForm = {
		name: "",
		about: "",
	};

	const [formState, setFormState] = useState(emptyForm);
	const [errorMessage, setErrorMessage] = useState("");

	const submitForm = async (event) => {
		event.preventDefault();
		try {
			const response = await fetchWithJWT("/api/house/", {
				method: "POST",
				body: JSON.stringify(formState),
			});
			const data = await response.json();

			if (response.status !== 200) {
				throw data;
			}
            
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
		<>
			<div>
				<form onSubmit={submitForm}>
					<div className="row gy-2">
						<div className="col-12">
							<div className="input-group">
								<label className="input-group-text" htmlFor="name">
									House Name
								</label>
								<input
									className="form-control"
									id="name"
									name="name"
									required
									onChange={handleFormInput}
									value={formState ? formState.name : ""}
								></input>
							</div>
						</div>

						<div className="col-12">
							<div className="input-group">
								<label className="input-group-text" htmlFor="about">
									About
								</label>
								<textarea
									required
									onChange={handleFormInput}
									value={formState ? formState.about : ""}
									className="form-control"
									id="about"
									name="about"
								></textarea>
							</div>
						</div>

						<div className="col-12">
							<button className="btn btn-primary" role="submit">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default CreateHouse;
