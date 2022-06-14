import { useContext } from "react";
import PageTransition from "../components/animation/pageTransition";
import { DataContext } from "../components/mainContext/globalData";
import { profileStartSVG, profileEndSVG } from "../resources/svgs/profileSVG"

export default function Profile() {

    const { myUser } = useContext(DataContext)
    return (
        <PageTransition startSVG={profileStartSVG} endSVG={profileEndSVG}>
            <div className="my-flex-padded">
                <div className="card-1 glass-background">
                    <h1 className="glass-background">Profile Options</h1>

                    <div className="profile-avatar-container">
                        <div className="avatar-container">
                            <img className="avatar" src={myUser.ppurl}></img>
                            <div className="avatar-change">Change Picture</div>
                        </div>
                    </div>
                    <div className="">username: <span>{myUser.username}</span></div>
                    <div className="">name: <span>{myUser.first_name}</span></div>
                    <div className="">lastname: <span>{myUser.last_name}</span></div>
                    <div className="">Change Profile Picture</div>
                    <div className="">Change Profile Picture</div>
                </div>
            </div>
        </PageTransition>
    )
}