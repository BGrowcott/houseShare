import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

const Login = () => {
    const emptyForm = {
        email: "",
        password: "",
    };
    const [formState, setFormState] = useState(emptyForm);
    const [errorMessage, setErrorMessage] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetchWithJWT("/api/user/login", {
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
            <h2>Log In</h2>
            <form onSubmit={submitForm} className="form">
                <label className="form-label" htmlFor="email-login">
                    Email:
                </label>
                <input
                    id="email-login"
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={handleFormInput}
                    value={formState ? formState.email : ""}
                ></input>
                <label className="form-label" htmlFor="password-login">
                    Password:
                </label>
                <input
                    id="password-login"
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={handleFormInput}
                    value={formState ? formState.password : ""}
                ></input>
                <button type="submit" className="mt-2 btn btn-primary">Login</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
};

export default Login;