<template>
  <main>
    <div
      v-if="!isAnimFinished"
      v-bind:style="[
        isAnimFinished && process === 0 ? '' : { transition: '3s' },
      ]"
      class="swosh-container"
      :class="[isMounted ? 'swosh2' : 'swosh']"
    ></div>
    <div
      v-bind:style="[
        isAnimFinished ? '' : { transition: '1.5s' },
        isMounted ? { 'transition-delay': '1.5s' } : '',
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
</template>

<script>
import axios from "axios";
import LoadingIcon from "../loading/LoadingIcon.vue";
import FailureIcon from "../loading/FailureIcon.vue";
export default {
  name: "SignupPage",
  setup() {},
  components: {
    LoadingIcon,
    FailureIcon,
  },
  data: function () {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      pswrd: "",
      cnfrPswrd: "",
      mounted: false,
      animFinished: false,
      errMsg: "",
      process: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
      console.log("created");
    }, 500);

    setTimeout(() => {
      this.animFinished = true;
    }, 3500);
  },

  computed: {
    isMounted() {
      return this.mounted;
    },
    isAnimFinished() {
      return this.animFinished;
    },
    passwordStatus() {
      let status = { pswrdMatch: true };
      console.log(this.pswrd);
      if (this.pswrd !== this.cnfrPswrd) {
        console.log(this.pswrd + " psswrd " + this.cnfrPswrd);
        console.log(this.pswrd);
        status.pswrdMatch = false;
      }
      return status;
    },
  },
  methods: {
    unMount() {
      this.mounted = !this.mounted;
    },
    hitServer(e) {
      this.process = 1;
      e.preventDefault();
      console.log(
        "hitting the backend",
        this.firstname,
        this.lastname,
        this.email,
        this.pswrd,
        this.cnfrPswrd
      );
      this.errMsg = "";
      let body = {
        query: `
        mutation RegisterMyUser{
            registerUser(username: "${this.username}", first_name: "${this.firstname}" last_name: "${this.lastname}", email: "${this.email}", password: "${this.password}"){
                ... on AuthPayload {
                    token
                    user {
                        id
                    }
                }
                ... on Error {
                    msg
                    code
                }
            }
        }
      `,
      };
      console.log(body);
      axios
        .post("http://localhost:4000/graphql", body)
        .then((data) => {
          let info = data.data.data.registerUser;
          if (info !== null && !info.code) {
            this.process = 2;
            this.animFinished = false;
            setTimeout(() => {
              this.process = 3;
            }, 1500);
            setTimeout(() => {
              this.mounted = false;
            }, 4000);
          } else {
            if (info.code) {
              console.log("invalid entry");
              this.process = -1;
              if (info.code === 2) {
                this.errMsg = "That email has already been used";
              }
              if (info.code === 3) {
                this.errMsg = "That username has already been used";
              }
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import url(//db.onlinewebfonts.com/c/4504d77ae8b1517de38b53c4c4ec6461?family=Circular+Sp+UI+v3+T+Bold);
@font-face {
  font-family: "Circular Sp UI v3 T Bold";
  src: url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.eot");
  src: url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/4504d77ae8b1517de38b53c4c4ec6461.svg#Circular Sp UI v3 T Bold")
      format("svg");
}
html,
body,
head {
  margin: 0px;
  padding: 0px;
}
nav {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
body {
  background-color: rgb(93, 177, 251);
}
main {
  /* background-color: rgb(93, 177, 251); */
  position: relative;
}
p {
  color: white;
}
.swosh-container {
  position: fixed;
  width: 200vw;
  height: 500vh;
  background-color: rgb(255, 255, 255);
  top: 0px;
  left: 0px;
  transform: rotate(20deg) translate(-100vw, -50vh);
  z-index: 3;
}
.swosh {
}
.swosh2 {
  transform: rotate(20deg) translate(-300vw, -700px);
}

.main-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  width: 100vw;
  height: 80vh;
}
.opaque {
  opacity: 1;
  transform: translate(0, 0px);
}
.transparent {
  opacity: 0;
  transform: translate(0, 20px);
}
.transparent2 {
  opacity: 0;
  transform: translate(0, -40px);
}

#login-container {
  width: 100%;
}

#login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100px;
  font-size: 24px;
  font-weight: 300;
  font-family: "Circular Sp UI v3 T Bold";
}

#form-container {
  height: 300px;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#login-form {
  width: 400px;
}
label {
  font-size: 14px;
  font-family: "Circular Sp UI v3 T Bold";
  font-weight: 500;
  height: 20px;
  color: white;
  margin-bottom: 5px;
}

.input-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(201, 201, 201);
  width: 300px;
  height: 30px;
  padding: 4px;
  padding-left: 8px;
  font-family: "Circular Sp UI v3 T Bold";
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
}
.input-user-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.input-pass-cnt {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.input-cnt {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seperator {
  margin: 10px;
  width: 340px;
  height: 1px;
  border: none;
  background-color: rgb(206, 232, 255);
}

#register-bttn {
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: white;
  background-color: rgb(0, 116, 218);
  font-family: "Circular Sp UI v3 T Bold";
  font-size: 16px;
  padding: 4px;
  color: white;
  transition: 0.5s;
}
#register-bttn:hover {
  background-color: rgb(93, 177, 251);
}
#register-bttn:active {
  background-color: rgb(79, 137, 188);
}
.spacing {
  width: 100%;
  height: 10px;
}
.text {
  font-family: "Circular Sp UI v3 T Bold";
  font-size: 16px;
  color: black;
  text-align: center;
}
.hidden {
  display: none;
}
.processing {
  margin: 0px;
  font-family: "Circular Sp UI v3 T Bold";
  font-size: 30px;
  font-weight: 300;
}
.fading {
  transition: 1s;
}
.faded {
  opacity: 0;
}
.not-faded {
  opacity: 1;
}
.success {
  transition: 2s;
  position: fixed;
  top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 300%;
  font-family: "Circular Sp UI v3 T Bold";
  font-weight: 300;
  color: rgb(111, 255, 0);
}
.success p {
  text-align: center;
  margin: 0px;
}
</style>
