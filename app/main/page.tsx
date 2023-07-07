"use client";
import styles from "app/main/Main.module.scss"
import Dropinbucket from "@/components/elements/DropInBucket"
// import styles from './main.scss';       // cant back up one directory and have access right away 

export default function Main() {
    const RenderMain = () => {
        return (
            <div className={styles.divcont}>
                <Dropinbucket/>
            </div>
        )
    }

    return <div className={styles.maincontainer}> {RenderMain()} </div>
}