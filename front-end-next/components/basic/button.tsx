import { useRef, useState } from "react"

export default function Button({ children }) {
    const span = useRef(null);
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
    function handleClick(e) {
        clearTimeout(timeoutID);
        span.current.classList.remove("ripple-animated")
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        void span.current.offsetWidth;
        span.current.classList.add("ripple-animated")
        span.current.style.left = x + 'px';
        span.current.style.top = y + 'px';


        let id = setTimeout(() => {
            span.current.classList.remove("ripple-animated")
        }, 500);
        setTimeoutID(id);
    }
    return (
        <button className="bttn" onClick={handleClick}>
            <span className="ripple-c" ref={span}></span>
            {children}
        </button>
    )
}