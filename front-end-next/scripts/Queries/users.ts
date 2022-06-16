import axios from "axios";
import {getUserFromIdQuery, getUsers} from "./GQL/queries"

const HOST_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export async function queryAllUsers(){
    let response = null;
    console.log(HOST_URL)
    await axios.post(HOST_URL,getUsers).then(res => {
        console.log(res);
        response = res.data.data.allUsers;
    }).catch(err => console.log(err));
    return response;
}

export async function getUserFromId(user_id){
    let response = null;
    const header = `Bearer${window.localStorage.getItem("token")}`;
    await axios.post(HOST_URL, getUserFromIdQuery(user_id)).then(res => {
        console.log(res.data.data.user);
        response = res.data.data.user;
    }).catch(err => console.log(err));
    return response;
}