import { useContext, useEffect, useState } from "react";
import UseForm, { passesValidation } from "../components/form/useForm";
import { formStateManager, queryBody } from "../components/form/types";
import sendRequest from "../components/form/sendRequest";
import returnBodyRequest from "../components/form/requestBody";
import FailureIcon from "../components/icons/failureIcon";
import LoadingIcon from "../components/icons/loadingIcon";
import Image from 'next/image';
// import '../styles/Signup.css';
// import styles from '../styles/Signup.module.css'


import doneAnim from "../resources/done.gif"
import { DataContext } from "../components/mainContext/globalData";
import { useRouter } from "next/router";
import InputErr from "../components/form/inputErr";

export default function SignUp() {
  const [animFinished, setAnimFinished] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [process, setProcess] = useState<number>(0);
  const { animation } = useContext(DataContext);
  const stateManager = { setProcess, setMounted, setAnimFinished };

  useEffect(() => {


    // elem.classList.add('background-blue');
    setTimeout(() => {
      setMounted(true);
    }, 10);

    setTimeout(() => {
      setAnimFinished(true);
    }, 1100);
  }, []);
  useEffect(() => {
    if (animation.state === -1) {
      setAnimFinished(false);
      //just make it so the swosh component mounts cause a lot of this is kinda janky
      setTimeout(() => {
        setMounted(false);
      }, 100)
    }
  }, [animation])


  return (
    <>
      <main className="signup-container">
        {!animFinished && <div
          style={{ transition: `${process === 0 || animation.state === -1 ? '1s' : '1s'}` }}
          className={`swosh-container ${mounted ? 'swosh2' : 'swosh'}`}
        ></div>}
        <div id="main-container"
          style={{ transition: `${animFinished ? '1s' : '1s'}`, transitionDelay: `${animFinished ? '' : '1s'}` }}
          className={`main-container ${process === 0 ? mounted ? 'opaque' : 'transparent' : process === 2 || process === 3 || process === 4 ? 'transparent' : ''}`}
        >
          <div className="login-container">
            <div className="login-header">
              <p>Sign Up</p>
              <hr className="seperator" />
            </div>
            <SignupForm process={process} stateManager={stateManager} />

          </div>
        </div>
        <div className={`success ${process === 3 ? 'not-faded' : 'faded'}`}>
          {(process === 3 || process === 4) &&
            <div>
              {/* <Image src="../resources/done.gif" /> */}
              <Image layout="fixed" src={doneAnim} />
              <p>success</p>
            </div>
          }
        </div>
      </main>
    </>
  );
}
type formProps = {
  process: number,
  stateManager: formStateManager,
}




function SignupForm({ process, stateManager }: formProps) {

  //set up states
  const formObj = UseForm();
  const { email, username, password, firstname, lastname, setData } = formObj;
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  const { dispatch } = useContext(DataContext);

  function hitServer(e) {
    if (process === 0 || process === -1) {
      stateManager.setProcess(1);
      e.preventDefault();

      if (passesValidation(formObj.errors) === true) {
        let body: queryBody = returnBodyRequest(formObj);

        sendRequest(stateManager, setErrMsg, body, dispatch, router);
        setErrMsg("");
      } else {
        console.log(formObj)
        let errMsg = ""
        if (!formObj.errors.email) errMsg += "Email isn't valid\n"
        if (!formObj.errors.password.pass) errMsg += "password isn't valid\n"
        if (!formObj.errors.username) errMsg += "username isn't valid\n"
        if (!formObj.errors.firstname) errMsg += "firstname isn't valid\n"
        if (!formObj.errors.lastname) errMsg += "lastname isn't valid\n"
        setErrMsg(errMsg);
        stateManager.setProcess(-1);
      }

    } else {
      console.log("cannot send too many requests")
    }
  }
  function doesPswrdMatch(): boolean {
    return true;
  }


  return (
    <div className="form-container">
      <form className="login-form">
        <div className="input-user-cnt">
          <label htmlFor="fname-input">What is your first name</label>
          <div className="input-box">
            <input
              name="firstname"
              id="fname-input"
              value={formObj.firstname}
              onChange={e => formObj.setData('firstname', () => e.target.value)}
              type="text"
              placeholder="First name"
            />
            <InputErr logic={!formObj.errors.firstname && formObj.firstname.length > 0} warning="field needs to contain only alphabetical values, and be at least 3 characters long" />
          </div>
        </div>
        <div className="input-pass-cnt">
          <label htmlFor="lname-input">What is your last name</label>
          <div className="input-box">
            <input
              value={formObj.lastname}
              onChange={e => formObj.setData('lastname', () => e.target.value)}
              name="lastname"
              id="lname-input"
              type="text"
              placeholder="Last name"
            />
            <InputErr logic={!formObj.errors.lastname && formObj.lastname.length > 0} warning="field needs to contain only alphabetical values, and be at least 3 characters long" />
          </div>
        </div>

        <div className="input-pass-cnt">
          <label htmlFor="user-input">What is your username</label>
          <div className="input-box">
            <input
              value={formObj.username}
              onChange={e => formObj.setData('username', () => e.target.value)}
              name="username"
              id="user-input"
              type="text"
              placeholder="Username"
            />
            <InputErr logic={!formObj.errors.username && formObj.username.length > 0} warning="field needs to contain only alphabetical values, and be at least 3 characters long" />
          </div>
        </div>
        <div className="input-pass-cnt">
          <label htmlFor="email-input">What is your email</label>
          <div className="input-box">
            <input
              value={formObj.email}
              onChange={e => formObj.setData('email', () => e.target.value)}
              name="email"
              id="email-input"
              type="text"
              placeholder="Email"
            />
            <InputErr logic={!formObj.errors.email && formObj.email.length > 0} warning="must be a valid email, such as example@example.com" />
          </div>
        </div>
        <div className="input-pass-cnt">
          <label htmlFor="password-input">Enter your password</label>
          <div className="input-box">
            <input
              value={formObj.password}
              onChange={e => formObj.setData('password', () => e.target.value)}
              name="password"
              id="password-input"
              type="password"
              placeholder="Password"
            />
            <InputErr logic={!formObj.errors.password.pass && formObj.password.length > 0} warning="password must contain at least 1 special character, 1 number, 1 lower case letter, and 1 upper case letter." />
          </div>
        </div>
        <div className="input-pass-cnt">
          <label htmlFor="password-conf-input">Confirm your password</label>

          <div className="input-box">
            <input
              name="password-confirm"
              id="password-conf-input"
              className="input-box"
              type="password"
              placeholder="Confirm Password"
            />
            <InputErr logic={!doesPswrdMatch() && formObj.password.length > 0} warning="passwords must match" />
          </div>
        </div>

        <div className="input-cnt">
          <button disabled={!(process === 0 || process === -1)} type="submit" id="register-bttn" onClick={hitServer}>
            Register
          </button>
        </div>
        <div
          className={`fading ${process === 1 || process === 2 || process === 3 || process === -1
            ? 'not-faded'
            : 'faded'
            }`
          }
        >
          {(process === 1 || process === 2 || process === 3) &&
            <div>
              <LoadingIcon />
              <p className="processing">Processing</p>
            </div>
          }
          {process === -1 &&
            <>
              <FailureIcon />
              {/* <FailureIcon /> */}
              <p className="processing">
                Failed to create<br />
                account
              </p>
              <p>{errMsg}</p>
            </>
          }
        </div>
      </form >
    </div >
  );
}

/**
 * 
 */




/**
 * <main>
    <div
      v-if="!isAnimFinished"
      v-bind:style="[
        isAnimFinished && process === 0 ? '' : { transition: '2s' },
      ]"
      class="swosh-container"
      :class="[isMounted ? 'swosh2' : 'swosh']"
    ></div>
    <div
      v-bind:style="[
        isAnimFinished ? '' : { transition: '1s' },
        !isAnimFinished ? { 'transition-delay': '1s' } : '',
      ]"
      id="main-container"
      class="main-container"
      :class="[
        process === 0
          ? isMounted
            ? 'opaque'
            : 'transparent'
          : process === 2 || process === 3 || process === 4
          ? 'transparent'
          : '',
      ]"
    >
      <div id="login-container">
        <div id="login-header">
          <p>Sign Up</p>
          <hr class="seperator" />
        </div>

        <div id="form-container">
          <form class="login-form">
            <div class="input-user-cnt">
              <label for="fname-input">What is your Firstname</label>
              <input
                v-model="firstname"
                name="firstname"
                id="fname-input"
                class="input-box"
                type="text"
                placeholder="Firstname"
              />
            </div>
            <div class="input-pass-cnt">
              <label for="lname-input">What is your Lastname</label>
              <input
                v-model="lastname"
                name="lastname"
                id="lname-input"
                class="input-box"
                type="text"
                placeholder="Lastname"
              />
            </div>

            <div class="input-pass-cnt">
              <label for="user-input">What is your Username</label>
              <input
                v-model="username"
                name="username"
                id="user-input"
                class="input-box"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="input-pass-cnt">
              <label for="email-input">What is your email?</label>
              <input
                v-model="email"
                name="email"
                id="email-input"
                class="input-box"
                type="text"
                placeholder="Email"
              />
            </div>
            <div class="input-pass-cnt">
              <label for="password-input">Enter your Password</label>
              <input
                v-model="pswrd"
                name="password"
                id="password-input"
                class="input-box"
                type="password"
                placeholder="Password"
              />
            </div>
            <div class="input-pass-cnt">
              <label for="password-conf-input">Confirm your Password</label>
              <div v-if="!passwordStatus.pswrdMatch" id="password-error">
                passwords don't match
              </div>
              <input
                v-model="cnfrPswrd"
                name="password-confirm"
                id="password-conf-input"
                class="input-box"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div class="input-cnt">
              <button type="submit" id="register-bttn" @click="hitServer">
                Register
              </button>
            </div>
            <div
              class="fading"
              :class="[
                process === 1 ||
                process === 2 ||
                process === 3 ||
                process === -1
                  ? 'not-faded'
                  : 'faded',
              ]"
            >
              <div v-if="process === 1 || process === 2 || process === 3">
                <LoadingIcon />
                <p class="processing">Processing</p>
              </div>
              <div v-if="process === -1">
                <FailureIcon />
                <p class="processing">
                  Failed to create<br />
                  account
                </p>
                <p>{{ errMsg }}</p>
              </div>
            </div>
          </form>

          <!-- <div class="spacing"></div> -->
        </div>
      </div>

      <!-- End of where posts are contained -->
    </div>
    <div class="success" :class="[process === 3 ? 'not-faded' : 'faded']">
      <div v-if="process === 3 || process === 4">
        <img src="../../../resources/done.gif" />
        <p>success</p>
      </div>
    </div>
  </main>
 */
