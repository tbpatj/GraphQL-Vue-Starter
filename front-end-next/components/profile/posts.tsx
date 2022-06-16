import { useEffect, useState } from "react";
import { getUsersPosts } from "../../scripts/Queries/getPosts";

export default function DisplayPosts({ user }) {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        let res = await getUsersPosts(user.id);
        console.log(res);
        setPosts(res);
    }
    //upon mounting load up the images of the page we are on
    useEffect(() => {
        getPosts();
    }, [])

    console.log('posts', posts);
    return (<>
        {posts.length > 0 && <>
            {posts.map((value) => {
                return (
                    <div className="post col-4 px-0 mx-0">
                        <img className="img-fluid" src={value.picture_url}></img>
                    </div>)
            })}</>
        }
    </>
    )
}