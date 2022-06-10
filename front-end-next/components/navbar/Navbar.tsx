import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react'
import { logoutUser } from '../../scripts/userFunctions';
import styles from '../../styles/Nav.module.css'
import AnimLink, { setAnimFrame } from '../animLink';
import { DataContext } from '../mainContext/globalData'
import ProfileDrawer from './profileDrawer';



export default function () {

    const { myUser, dispatch } = useContext(DataContext);
    const router = useRouter();
    const [profileDrawer, setProfileDrawer] = useState(false);
    function openLoginDrawer() {

    }

    return (
        <nav className={styles.nav}>
            <div className={styles["nav-container"]}>
                <div className={styles["page-link-container"]}>
                    <div className={styles["nav-item"]}><AnimLink href="/">Home</AnimLink></div>
                    <div className={styles["nav-item"]}><AnimLink href="/">About</AnimLink></div>
                    <div className={styles["nav-item"]}><Link href={"/"}>Pricing</Link></div>
                    <div className={styles["nav-item"]}><Link href={"/"}>Pages</Link></div>
                </div>
                <div className={styles["account-link-container"]}>
                    {myUser === undefined || myUser === null &&
                        <>
                            <div className={`${styles["nav-item"]} ${styles["nav-button"]}`}>
                                <AnimLink href="/login">
                                    Log in
                                </AnimLink>
                            </div>
                            <div className={`${styles["nav-item"]} ${styles["nav-button"]}`}>
                                <AnimLink href="/signup">
                                    Sign up
                                </AnimLink>
                            </div>
                        </>
                    }
                    {myUser !== undefined && myUser !== null && <>
                        <button className={styles['unstyled-btn']} onFocus={() => setProfileDrawer(true)} onBlur={() => setProfileDrawer(false)}>
                            <div className={styles['avatar-container']}>
                                <div className="avatar-container">
                                    <img className="avatar" src={myUser.ppurl}></img>
                                </div>
                                {/* <img className={styles['avatar']} src={`${myUser.ppurl}`}></img> */}

                            </div>
                            <ProfileDrawer opened={profileDrawer} items={[
                                { title: "Profile", callback: () => { setAnimFrame(router, dispatch, "/profile") } },
                                { title: "Settings", callback: () => { setAnimFrame(router, dispatch, "/settings") } }, {
                                    title: "Logout", callback: () => {
                                        logoutUser(dispatch);
                                        setAnimFrame(router, dispatch, "/")
                                    }
                                }]} />
                        </button>
                    </>}
                </div>
            </div>
        </nav>
    )
}