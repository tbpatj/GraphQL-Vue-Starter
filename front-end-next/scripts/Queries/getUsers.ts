import axios from "axios";
import {getUsers} from "./GQL/queries"

export async function queryAllUsers(){
    let response = null;
    console.log(process.env.NEXT_PUBLIC_SERVER_HOST)
    await axios.post(process.env.NEXT_PUBLIC_SERVER_HOST,getUsers).then(res => {
        console.log(res);
        response = res.data.data.allUsers;
    }).catch(err => console.log(err));
    return response;
}