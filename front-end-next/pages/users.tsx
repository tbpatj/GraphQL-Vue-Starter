import { useEffect, useState } from "react"
import PageTransition from "../components/animation/pageTransition";
import { useMovingSVG } from "../resources/svgs/usersSVG";
import { queryAllUsers } from "../scripts/Queries/getUsers"



export default function Users() {
    const [users, setUsers] = useState([]);
    async function getUsers() {
        let response = await queryAllUsers();
        if (response) {
            setUsers(response);
        }
    }
    useEffect(() => {
        getUsers();
    }, [])

    const { usersSVGStart, usersSVGEnd } = useMovingSVG();
    return (
        <>
            <PageTransition startSVG={usersSVGStart} endSVG={usersSVGEnd}>
                <div className="header-spacing"></div>
                <div className="container glass-background px-3">
                    <div className="row my-2 align-middle p-2">
                        <input className="glass-background"></input>
                    </div>
                    <div className="container search-container">
                        {users.map((user, index) => {
                            return (<>
                                <div className="row my-2 align-middle p-2" key={"userDisplay" + index}>
                                    <div className="user-list-profile-container col-1 p-0 my-auto">
                                        <div className="avatar-container ">
                                            <img className="avatar" src={user.ppurl}></img>

                                        </div>
                                    </div>
                                    <div className="h-50 col-5 align-middle my-auto">
                                        <p className="m-0">{user.first_name} {user.last_name}</p>
                                        <p className="m-0"><small>@{user.username}</small></p>
                                    </div>
                                    <div className="col-4"></div>
                                    <div className="h-25 my-auto col-2 btn btn-primary">follow</div>
                                </div>
                                <hr />
                            </>

                            )
                        })}
                    </div>
                </div>
            </PageTransition>
        </>)
}