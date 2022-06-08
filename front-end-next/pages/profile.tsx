import PageTransition from "../components/animation/pageTransition";
import { profileStartSVG, profileEndSVG } from "../components/svgs/profileSVG"

export default function Profile() {
    return (
        <PageTransition startSVG={profileStartSVG} endSVG={profileEndSVG}>
            <h1>Profile Options</h1>
            <div>Change Profile Picture</div>
        </PageTransition>
    )
}