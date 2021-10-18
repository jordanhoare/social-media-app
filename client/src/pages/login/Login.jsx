import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls.js";
import { AuthContext } from "../../context/AuthContext.js";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, 
                password: password.current.value },
            dispatch
        );
    };

    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">socialApp</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            autoComplete="on"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress 
                                    size="20px" />)
                                    : ("Log In")}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress size="20px" />
                            ) : (
                                "Create a New Account"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}