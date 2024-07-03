import styles from "./Dropinbucket.module.scss"
import {useImage} from 'Contexts/ImgContext'
import React from 'react'

export default function Dropinbucket () {
    const { bucket, mouseDroplet } = useImage() 

    const renderDropinbucket = () => {
        return (
            <>  
                <div id={styles.centercont}>
                <img id={styles.loadingdroplet} src={mouseDroplet}/>
                </div>

                <div id={styles.centercont}>
                <img id={styles.loadingbucket}  src={bucket}/>
                {/* <pre id={styles.loadingtext}> A Drop in the Bucket </pre> */}
                {/* <pre style={{ color: 'silver', fontWeight: 'bolder'}}> A Drop in the Bucket </pre> */}
                </div>
            </>
        )
    }

return <div id={styles.dropinbucketcont}> {renderDropinbucket()} </div>
    // return <div id={styles.dropinbucketcont}> {renderDropinbucket()} </div>
}