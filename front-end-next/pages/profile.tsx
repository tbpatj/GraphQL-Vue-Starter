import { useContext } from "react";
import PageTransition from "../components/animation/pageTransition";
import { DataContext } from "../components/mainContext/globalData";
import { profileStartSVG, profileEndSVG } from "../resources/svgs/profileSVG"
import ProfileHeader from "../components/profile/headerProfile";
import ProfileNav from "../components/profile/navProfile";
export default function Profile() {

    const { myUser } = useContext(DataContext);
    if (!myUser) return null;
    return (
        <PageTransition startSVG={profileStartSVG} endSVG={profileEndSVG}>
            <div className="header-spacing"></div>
            <div className="container profile-container glass-background">
                <ProfileHeader user={myUser} />
                <ProfileNav user={myUser} />

            </div>
        </PageTransition >
    )
}







