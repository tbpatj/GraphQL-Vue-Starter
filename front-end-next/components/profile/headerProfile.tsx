export default function ProfileHeader({ user }) {
    return (
        <>
            <div className="row align-middle relative">
                <div className="col-12 p-1">
                    <BackgroundSVG />
                    <div className="profile-avatar-container">
                        <div className="avatar-container ">
                            <img className="avatar" src={user.ppurl}></img>

                        </div>
                    </div>
                </div>

            </div>
            <div className="row my-0 align-middle p-2 flex-wrap">
                <div className="col-md-2 col-sm-6"></div>
                <div className="col-md-5 col-sm-6 d-flex flex-column justify-content-end my-2 align-center">
                    <div className="text-md-left text-sm-right text-right mx-2 my-auto">{user.first_name} {user.last_name}</div>
                    <small className="text-md-left text-sm-right text-right mx-2 my-auto">@{user.username}</small>
                </div>
                {/* <div className="col-md-0 col-sml-6"></div> */}
                <div className="col-md-5 col-sm-12 d-flex flex-row-reverse ">
                    <div className="btn btn-primary my-auto mx-2">{window.innerWidth > 500 ? "follow" : "+"}</div>
                    <div className="m-1 text-center d-flex align-items-center justify-content-between"><span><b>321</b> <small className="m-0 p-0">Followers</small></span></div>
                    <div className="m-1 text-center d-flex align-items-center justify-content-between"><span><b>321</b> <small className="m-0 p-0">Following</small></span> </div>
                </div>
            </div>
            <div className="row align-middle relative">
                {/* <div className="col- p-1"></div> */}


            </div>
        </>
    )
}

function BackgroundSVG() {
    return (
        <svg width="100%" height="200px" preserveAspectRatio="none" className="background-img-container">
            <defs>
                <mask id="my-svg-mask2" width="100%" height="200px">
                    <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="100%" height="200px"></rect>
                    <circle id="Oval" fill="#000000" cx="88px" cy="198px" r="53px"></circle>
                </mask>
            </defs>
            <image width="200%" className="background-img-container" xmlnsXlink="http://www.w3.org/1999/xlink" href="https://images.unsplash.com/photo-1652797877221-cd49a0a45c9d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NTQwMjI4NA&ixlib=rb-1.2.1&q=80&w=2000" mask="url(#my-svg-mask2)"></image>
        </svg>
    )
}