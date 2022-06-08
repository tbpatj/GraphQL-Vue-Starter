import styles from '../../styles/Nav.module.css'

export default function ProfileDrawer({ opened, items }) {
    return (
        <div className={`${styles["drawer-container"]} ${opened ? styles["drawer-container-opened"] : ""}`}>
            {items.map((item, index) => {
                return (<><div onClick={item.callback}><span>{item.title}</span></div>{(index !== items.length - 1) && <hr />}</>)
            })}
        </div >
    )
}