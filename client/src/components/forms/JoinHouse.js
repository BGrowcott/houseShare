import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";
import { useGlobalContext } from "../../utils/GlobalState";
import { LOAD_HOUSE } from "../../utils/actions";

function JoinHouse() {
	const [joinCode, setJoinCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [state, dispatch] = useGlobalContext();

	const handleChange = (event) => {
		const { value } = event.target;
		setJoinCode(value);
	};

    const submitJoin = async (event) => {
        event.preventDefault();
        try {
			const response = await fetchWithJWT("/api/house/join-house", {
				method: "POST",
				body: JSON.stringify({ joinCode }),
			});

			const data = await response.json();

            dispatch({ type: LOAD_HOUSE, house: {...data} });

			if (response.status !== 200) {
				throw data;
			}
            
		} catch (error) {
			console.log(error);
			setErrorMessage(error.message);
		}
    };

	return (
		<div>
			<form onSubmit={submitJoin}>
				<div className="row gy-2">
					<div className="col-12">
						<div className="input-group">
							<label className="input-group-text" htmlFor="join-house-input">
								Join Code
							</label>
							<input required className="form-control" type="text" id="join-house-input" onChange={handleChange} value={joinCode}></input>
						</div>
					</div>
					<div className="col-12">
						<button className="btn btn-primary" type="submit">
							Submit
						</button>
					</div>
				</div>
                <div>
                    <p className="text-danger">{errorMessage}</p>
                </div>
			</form>
		</div>
	);
}

export default JoinHouse;
