import { useContext, useEffect, useState } from "react";
import { DataContext } from "../mainContext/globalData";

type PageTransitionProps = {
    children: any;
    startSVG?: any;
    endSVG?: any;
}

export default function PageTransition({ children, startSVG, endSVG }: PageTransitionProps) {
    const [process, setProcess] = useState(0);
    const { animation } = useContext(DataContext);
    useEffect(() => {
        setTimeout(() => {
            setProcess(1);
        }, 100);
        setTimeout(() => {
            setProcess(2);
        }, 1000);
    }, [])
    //this display variable makes react think that start svg and endSVG are the same
    const display = process === 0 || animation.state === -1 ? startSVG : endSVG;
    return (
        <>
            {startSVG !== null && endSVG !== null &&
                <>
                    <div className="background-container">
                        <div className='clip-background'></div>
                        <svg className={`my-svg ${process === 0 || animation.state === -1 ? "my-svg-close" : ""}`} width="0" height="0" viewBox="0 0 1 0.47" style={{ zIndex: "100" }}>
                            {display}
                        </svg>
                    </div>
                </>}
            <div className={`main-container ${animation.state !== -1 && process > 0 ? 'opaque' : 'transparent'}`}>
                {children}
            </div>
        </>
    )

}