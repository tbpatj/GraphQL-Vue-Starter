import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PageTransition from "../components/animation/pageTransition";
import { returnLoginBody } from "../components/form/requestBody";
import { sendLoginRequest } from "../components/form/sendRequest";
import UseForm from "../components/form/useForm";
import FailureIcon from "../components/icons/failureIcon";
import LoadingIcon from "../components/icons/loadingIcon";
import { DataContext } from "../components/mainContext/globalData";
import { loginSVGEnd, loginSVGStart } from "../resources/svgs/loginSVG"

function LoginForm() {
    const { dispatch } = useContext(DataContext);
    const router = useRouter();
    const formObj = UseForm();
    const { email, password, setData } = formObj;
    const [state, setState] = useState(0);


    async function login(e) {
        setState(1);
        e.preventDefault();
        let body = returnLoginBody(formObj);
        let loginStatus = await sendLoginRequest(body, dispatch, router);
        console.log(loginStatus);
        if (!loginStatus) setState(-1);
        else setState(2);
    }

    return (<>
        <div id="main-container"
            className={`main-container`}
        >
            <div className="login-container dark glass-background">
                <div className="login-header dark">
                    <p>Log In</p>
                    <hr className="seperator" />
                </div>

                <div className="form-container dark">
                    <form className="login-form">


                        <div className="input-pass-cnt">
                            <label htmlFor="user-input">What is your Username</label>
                            <div className="input-box">
                                <input
                                    value={formObj.username}
                                    onChange={e => formObj.setData('username', () => e.target.value)}
                                    name="username"
                                    id="user-input"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        <div className="input-pass-cnt">
                            <label htmlFor="password-input">Enter your Password</label>
                            <div className="input-box">
                                <input
                                    value={formObj.password}
                                    onChange={e => formObj.setData('password', () => e.target.value)}
                                    name="password"
                                    id="password-input"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="input-cnt">
                            <button type="submit" id="register-bttn" onClick={(e) => login(e)}>
                                Log in
                            </button>
                            {state === 1 &&
                                <>
                                    <LoadingIcon />
                                </>}
                            {state === -1 &&
                                <>
                                    <FailureIcon />

                                    <div className="centered-text">Failed to Log in <br /> incorrect username/email, password</div>
                                </>}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    </>)
}
export default function Login() {
    return (<>
        <PageTransition startSVG={loginSVGStart} endSVG={loginSVGEnd} > <LoginForm /></PageTransition>
    </>)
}