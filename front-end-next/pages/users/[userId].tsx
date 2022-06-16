import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { getUserFromId } from "../../scripts/Queries/users";
import PageTransition from "../../components/animation/pageTransition";
import ProfileHeader from "../../components/profile/headerProfile";
import ProfileNav from "../../components/profile/navProfile";
import { useMovingSVG } from "../../resources/svgs/usersSVG"

export default function Users() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const { userId } = router.query;

    async function getUser() {
        let res = await getUserFromId(userId);
        setUser(res);
    }

    useEffect(() => {
        getUser();
    }, [userId])

    if (user === null) return null;

    return (<div><UserProfile user={user} /></div>)
}

function UserProfile({ user }) {
    const { usersSVGStart, usersSVGEnd } = useMovingSVG();
    return (
        <PageTransition startSVG={usersSVGStart} endSVG={usersSVGEnd}>
            <div className="header-spacing"></div>
            <div className="container profile-container glass-background">
                <ProfileHeader user={user} />
                <ProfileNav user={user} />

            </div>
        </PageTransition >
    )
}
