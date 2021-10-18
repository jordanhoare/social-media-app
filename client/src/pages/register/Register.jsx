import axios from "axios";
import { useRef } from "react";
import "../login/login.css";
import { useHistory } from "react-router";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();


    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords do not match.");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">socialApp</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleClick}>

                        <input className="loginInput"
                            type="username"
                            placeholder="Username"
                            autoComplete="on"
                            required
                            ref={username}
                        />
                        <input className="loginInput"
                            type="email"
                            placeholder="Email"
                            autoComplete="on"
                            required
                            ref={email}
                        />

                        <input className="loginInput"
                            type="password"
                            placeholder="Password"
                            autoComplete="on"
                            required
                            ref={password}
                            minLength="6"
                        />
                        <input className="loginInput"
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="on"
                            required
                            ref={passwordAgain}
                        />
                        <button className="loginButton" type="submit">Sign up</button>
                        <button className="loginRegisterButton">Already have an account?</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
