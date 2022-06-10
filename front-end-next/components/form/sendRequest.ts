import { DispatchWithoutAction } from "react";
import axios from "../../node_modules/axios/index";
import { getUser, setUser } from "../../scripts/userFunctions";
import { setAnimFrame } from "../animLink";
import { formStateManager, queryBody } from "./types";


export async function sendLoginRequest( body: queryBody,dispatch:DispatchWithoutAction, router){
  await axios
      .post("http://192.168.0.97:4000/graphql", body)
      .then((data) => {
        console.log(body);
        console.log(data);
        let info = data.data.data.login;
        if (info !== null && !info.code) {
       
          window.localStorage.setItem("token",info.token);
          setUser(dispatch,info.user);
          setAnimFrame(router,dispatch,"/")
        } else {
          console.log('failed');
        }
      }).catch( (err) => console.log(err))
    return true;
}

export default function sendRequest(formManage: formStateManager,setErrMsg: React.Dispatch<React.SetStateAction<string>>, body: queryBody,dispatch:DispatchWithoutAction, router) {
    
    axios
      .post("http://192.168.0.97:4000/graphql", body)
      .then((data) => {
        let info = data.data.data.registerUser;
        if (info !== null && !info.code) {
            formManage.setProcess(2);
            formManage.setAnimFinished(false);
          setTimeout(() => {
            formManage.setProcess(3);
          }, 1500);
          setTimeout(() => {
            formManage.setMounted(false);
          }, 4000);
          setTimeout(() => {
            setAnimFrame(router,dispatch,"/")
          },1500)
          
          window.localStorage.setItem("token",info.token);
          setUser(dispatch,info.user);
        } else {
          if (info.code) {
            console.log("invalid entry");
            formManage.setProcess(-1);
            if (info.code === 2) {
              setErrMsg("That email has already been used");
            }
            if (info.code === 3) {
              setErrMsg("That username has already been used");
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }