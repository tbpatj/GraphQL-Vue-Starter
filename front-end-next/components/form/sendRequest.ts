import { DispatchWithoutAction } from "react";
import axios from "../../node_modules/axios/index";
import { getUser, setUser } from "../../scripts/userFunctions";
import { setAnimFrame } from "../animLink";
import { formStateManager, queryBody } from "./types";


export async function sendLoginRequest( body: queryBody,dispatch:DispatchWithoutAction, router){
  let returnResponse = false;
  await axios
      .post(process.env.NEXT_PUBLIC_SERVER_HOST, body)
      .then((data) => {
        console.log(body);
        console.log(data);
        let info = data.data.data.login;
        if (info !== null && !info.code) {
       
          window.localStorage.setItem("token",info.token);
          setUser(dispatch,info.user);
          setAnimFrame(router,dispatch,"/");
          returnResponse = true;
        } else {
          console.log('failed');
          returnResponse = false;
        }
      }).catch( (err) => {
        console.log(err);
        returnResponse = false;
      })
    return returnResponse;
}

export default function sendRequest(formManage: formStateManager,setErrMsg: React.Dispatch<React.SetStateAction<string>>, body: queryBody,dispatch:DispatchWithoutAction, router) {
    
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_HOST, body)
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