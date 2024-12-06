import AuthService from "../../utils/AuthService";

function Home() {

    const user = AuthService.getProfile();

    const logout = (e) => {
        e.preventDefault();
        AuthService.logout();
       window.location.replace("/")
    };

    return (
        <div className="container-xxl">
            <h1>Hello {user.data.username}</h1>
            <button onClick={logout}>Log out</button>
            <div className="row">

            </div>
        </div>
    )
};

export default Home;