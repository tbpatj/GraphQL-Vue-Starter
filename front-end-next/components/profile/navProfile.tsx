import Link from "next/link";
import { useContext, useState } from "react";
import { DataContext } from "../mainContext/globalData";
import DisplayPosts from "./posts";

export default function ProfileNav({ user }) {
    const [selectedNav, setSelectedNav] = useState(1);
    const { myUser } = useContext(DataContext);
    return (
        <>
            <div className="row my-3">
                <div className="col-12">
                    <ProfileNavTab tabNum={1} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>posts</ProfileNavTab>
                    <ProfileNavTab tabNum={2} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>tags</ProfileNavTab>
                    <ProfileNavTab tabNum={3} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>likes</ProfileNavTab>
                    <ProfileNavTab tabNum={4} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>following</ProfileNavTab>
                    <ProfileNavTab tabNum={5} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>followers</ProfileNavTab>
                    {/* <span className="col-3">posts</span>
                <span className="col-3">tags</span>
                <span className="col-3">likes</span>
                <span className="col-3">following</span>
                <span className="col-3">followers</span> */}
                </div>
            </div>
            <div className="row my-3">
                <div className="container-fluid post-container">
                    <div className="row">
                        {selectedNav === 1 &&
                            <>
                                {user.id === myUser.id && <Link href="/create/post"><div className="col-4 px-0 mx-0 post d-flex flex-justify-center flex-align-center"><h1>+</h1></div></Link>}
                                <DisplayPosts user={user} />
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}

function ProfileNavTab({ children, tabNum, selectedNav, setSelectedNav }) {
    return (<span onClick={() => setSelectedNav(tabNum)} className={`mx-2 ${selectedNav === tabNum ? 'selected-text' : 'non-selected-text'}`}>{children}</span>)
}

