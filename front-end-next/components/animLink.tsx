import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "./mainContext/globalData";

export function setAnimFrame(router, dispatch, location) {
    dispatch({
        type: "setAnimationState",
        data: -1,
    });
    setTimeout(() => {
        console.log(location);
        router.push(location);
        dispatch({
            type: "setAnimationState",
            data: 0,
        });
    }, 1000)
}

export default function AnimLink({ children, href }) {
    const router = useRouter();
    const { dispatch } = useContext(DataContext);

    return (
        <div onClick={() => setAnimFrame(router, dispatch, href)}>
            {children}
        </div>
    )
}
