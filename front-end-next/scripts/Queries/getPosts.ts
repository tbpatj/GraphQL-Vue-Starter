import axios from "axios";
import {createPostQuery, getUserPostsQuery, getUsers} from "./GQL/queries"

const HOST_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export async function getUsersPosts(userId){
    let response = null;
    let body = getUserPostsQuery(userId);
    await axios.post(HOST_URL,body).then(res => {
        response = res.data.data.userPosts;
    }).catch(err => console.log(err));
    return response;
}

export async function createPost(content, pictureURL, isPublic, tags){
    let response = null;
    let body = createPostQuery(content,pictureURL,isPublic,tags);
    const header = `Bearer${window.localStorage.getItem("token")}`;
    
    await axios.post(HOST_URL,body,{
        headers: { Authorization: header }})
    .then(res => {response = res.data.data.createPost})
    .catch(err=>console.log(err));
    console.log(body)
    return response;
}