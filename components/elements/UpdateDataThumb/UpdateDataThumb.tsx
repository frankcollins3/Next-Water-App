import React, {useState} from "react"
import axios from "axios"

//  components and styles
import Container from "react-bootstrap/Container"
import styles from "./UpdateDataThumb.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { TOGGLE_REMINDER_FINISHED_UPDATE } from "redux/main/mainSlice"

// utils
import {useImage} from "Contexts/ImgContext"
import {getDayOfWeek} from "utility/UtilityValues"

export default function UpdateDataThumb() {
    const dispatch = useDispatch()

    const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
    const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
    const DATE = useSelector( (state:RootState) => state.main.DATE)
    const STATUS = useSelector( (state:RootState) => state.main.STATUS)

    const [imageHover, setImageHover] = useState<boolean>(false)
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false)

    const {like, statistics} = useImage()

    const updateDailyDataPOST = () => {
        const weekdayPROMISE = new Promise( (resolve:any, reject:any) => {
         let weekday = getDayOfWeek()
         resolve(weekday)
         reject("nothing")
       })
       weekdayPROMISE
       .then( (weekday) => {
         axios
         .post('/api/graphql', {
           query: `
           mutation {
             updateDailyData(users_id: ${CURRENT_USER.id}, date: "${DATE}", progress: ${PROGRESS}, weekday: "${weekday}", status: "${STATUS}") {
               google_id
               date
               weekday
               progress
               status
               users_id
             }
           }
           `
         }).then( (updatedDay) =>   {
           console.log('updatedDay', updatedDay)
           setSaveSuccess(true)           
           setTimeout( () => {
            dispatch(TOGGLE_REMINDER_FINISHED_UPDATE())
           }, 2000 )
         }).catch( (err) => {
           console.log("err", err)  
         })
       })
    }
    

    return (
        <Container id={styles.Cont}>
            <pre className={styles.ghost}> blue</pre>
            {
                saveSuccess
                    ?
    <img style={{ height: '50px', width: '50px' }} id={styles.Img} src={statistics}/>
                    :
                    <>
<img style={{ cursor: 'pointer' }} onClick={updateDailyDataPOST} onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)} id={styles.Img} src={like}/>
<h6 style={{ color: imageHover ? "#73defe" : "silver"}} id={styles.Text} > {imageHover ? "Data" : "Save"} </h6>
    <pre className={styles.ghost}> blue </pre>
                    </>
            }
        </Container>
    )
}