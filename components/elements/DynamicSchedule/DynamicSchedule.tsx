import $ from 'jquery'
import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';


// @reduxjs/toolkit 
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store/rootReducer';
import { SET_HYDRO_SCHEDULE, SET_HYDRO_INTAKE, SET_DISABLED, SET_PROGRESS, SET_STATUS,  TOGGLE_REMINDER_CLICK_TOO_EARLY, TOGGLE_CURRENT_CYCLE_IS_OVER } from 'redux/main/mainSlice';
import { TOGGLE_SUBMIT_INPUT_DATA } from 'redux/logInOutGoogle/logInOutGoogleSlice';

// components and styling
import Container from "react-bootstrap/Container";
// import Reminder from "components/elements/Reminder"
import styles from "./DynamicSchedule.module.scss";

// utils:
import { updateDailyDataQueryString } from "graphql/queries"
import { useImage } from "Contexts/ImgContext"
import { usePromise } from "Contexts/Promises"
import { DynamicComponents } from "interfaces/interface";
import { getDate, getDayOfWeek } from "utility/UtilityValues"

// interface DynamicSchedule {
//     DynamicComponents,
//     isExample: boolean;
// }

export default function DynamicSchedule(props: any) {
    return <RENDER {...props} />;
}

function RENDER(props: any) {
    const { height, width, margin, padding, elementId, elementClassname, style } = props;
    const [isShow, setIsShown] = useState(0)

    // dispatch() invocation for redux actions              & redux state below 
    const dispatch = useDispatch();
    const { waterFunctions, getDailyDataPROMISE } = usePromise();

    const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER);

    const SHOW_HYDRO_SETTINGS = useSelector((state: RootState) => state.main.SHOW_HYDRO_SETTINGS);
    const HYDRO_SCHEDULE = useSelector((state: RootState) => state.main.HYDRO_SCHEDULE);
    const STATUS = useSelector((state: RootState) => state.main.STATUS);
    const HYDRO_INTAKE = useSelector((state: RootState) => state.main.HYDRO_INTAKE);
    const DISABLED = useSelector((state: RootState) => state.main.DISABLED);
    const isExample = props?.isExample;     
    const todayDate = getDate();                                                                                                                             

    // functions

    const setSchedule = (settingsArray: any) => {
        const arr: number[] = [];
        for (let i = settingsArray?.startTime; i <= settingsArray?.endTime; i += settingsArray?.reminder) {
            arr.push(i)
        }
        dispatch(SET_HYDRO_SCHEDULE(arr));
    };

    const setHydroData = (settingsArray: any) => {
        // graphQL scalar type to 
        const hydroPump: number = settingsArray?.settings ? Math.ceil(settingsArray?.weight * (2 / 3)) : 100
        dispatch(SET_HYDRO_INTAKE(hydroPump))

    }
    
    // User doesnt exist useEffect. fires automatically since schedule wouldn't have been set yet.
    useEffect(() => {
        if (CURRENT_USER?.id === 0) {
            const exampleSettingsIfNoUser = {
                id: 7,
                age: 31,
                height: 60,
                weight: 170,

                startTime: 2,
                endTime: 18,
                reminder: 3,
            };
            setSchedule(exampleSettingsIfNoUser);
            setHydroData(exampleSettingsIfNoUser)
        }
    }, []);

    return (
        <Container
            className={styles.scheduleContainer || elementClassname}
        // style={{ height: `${height}%`, width: `${width}%`, margin: margin, padding: padding, ...style }}
        >
            <ul className={styles.ul}>
                {HYDRO_SCHEDULE?.map((time: number, index: number) => {
                    // const dimension: number = time * 10; 
                    return (
                        <Reminder
                            key={index}
                            height={height}
                            width={width}
                            percent={Math.floor((((HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1)) / HYDRO_INTAKE) * 100 - 1)}
                            time={time}
                            index={index}
                            amt={(HYDRO_INTAKE / HYDRO_SCHEDULE?.length) * (index + 1)}
                            amtper={HYDRO_INTAKE / HYDRO_SCHEDULE?.length}
                            isExample={props.isExample === true ? true : false}
                        />
                        // time, amt, amtper, percent, index, x, status, disabled
                        // <Reminder index={index} />
                    );
                })}
            </ul>
        </Container>
    );
}

interface Reminder {
    index: number,
    percent: number,
}

function Reminder(props: any) {

    const dispatch = useDispatch()
    const { waterDrop, bg } = useImage();
    const { waterFunctions }  = usePromise()

    const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER)

    const HYDRO_SCHEDULE = useSelector((state: RootState) => state.main.HYDRO_SCHEDULE)
    const STATUS = useSelector((state: RootState) => state.main.STATUS)
    const DISABLED = useSelector((state: RootState) => state.main.DISABLED)
    const PROGRESS = useSelector((state: RootState) => state.main.PROGRESS)
    const [exampleBarClickCount, setExampleBarClickCount] = useState<number>(0); 

    const HYDRO_INTAKE = useSelector((state: RootState) => state.main.HYDRO_INTAKE)
    const CURRENT_CYCLE_IS_OVER = useSelector((state: RootState) => state.main.CURRENT_CYCLE_IS_OVER)

    const length: number = HYDRO_SCHEDULE?.length;
    const index: number = props.index
    const time: number = props?.time
    const height = props?.height;
    const width = props?.width;
    const padding = props?.padding;
    const margin = props?.margin;
    const percent = props?.percent;
    const isExample = props?.isExample
    const amt = props?.amt
    const amtper = props?.amtper
    const updateDailyDataPROMISE = waterFunctions?.updateDailyDataPROMISE
    const todayDate = getDate();

    const resetDisabled = (index:number) => {
        const newDisabled = [...DISABLED];
        newDisabled[index] = true;
        dispatch(SET_DISABLED(newDisabled))
    }

    const resetStatus = (index:number) => {
        const newStatus = [...STATUS]         
        newStatus[index] = "check"                
        dispatch(SET_STATUS(newStatus))
    }

    const resetStatusAndDisabled = (index:number) => {
        resetDisabled(index)
        resetStatus(index)
    }
                                                                                                                            

    const handleClick = async (event:any, index:number) => {
        console.log("we are clicking handleclick right");
        
        const now = new Date();
        const currentHour = now.getHours();

// so that in the <Credits> the text that says: "Water is Life", text that starts {opacity: 0} but +% during successful water submission. cycle over? just show the text:
        if (index === HYDRO_SCHEDULE?.length - 1 && CURRENT_CYCLE_IS_OVER === false) {
                dispatch(TOGGLE_CURRENT_CYCLE_IS_OVER())        
        }

        // modularize to refactor just 1 line of code to execute. 
        if (isExample === true) {    
            if (exampleBarClickCount === 0) {
                console.log("right now click count === 0");
                setExampleBarClickCount(1);
                resetStatusAndDisabled(index);                
                
            } else {
                const newProgress = PROGRESS + 15
                console.log('newProgress', newProgress)
                console.log(PROGRESS + 15);
                resetStatusAndDisabled(index);
               dispatch(SET_PROGRESS(PROGRESS + newProgress))
               dispatch(TOGGLE_SUBMIT_INPUT_DATA())
               
            }
            // if (PROGRESS >= 25) {
            // }
            return;             
        }

        if (currentHour < time) {
            console.log("time < currentHour")
            // let difference = currentHour - time;
            let difference:number = time - currentHour;         
            console.log('difference', difference)
            const newStatus = [...STATUS];  
            console.log('newStatus', newStatus)  
            newStatus[index] = 'check';     
            dispatch(SET_STATUS(newStatus))       
            // have to change back to 2. 
            if (time - currentHour <= 2) {
            // if (time - currentHour <= 2) {
                const newDisabled = [...DISABLED];
                newDisabled[index] = true;
                dispatch(SET_DISABLED(newDisabled))
                dispatch(SET_STATUS(newStatus))
                // too-early 
                const filterProgress = newStatus.filter((e) => e === 'check');
                const calculateProgress = filterProgress.length / newStatus.length * 100

                

                // dispatch(SET_PROGRESS(calculateProgress * 100))               

// const query = `mutation { updateDailyData(users_id: ${CURRENT_USER?.id}, date: "2024-6-25", progress: 100, status: "${newStatus}") { 
//                     id, date, progress, weekday, status
//                 }}`
                const dailyData = await updateDailyDataPROMISE(CURRENT_USER?.id, todayDate, Math.round(calculateProgress), newStatus)
                // const dailyData = await updateDailyDataPROMISE(CURRENT_USER?.id, todayDate, calculateProgress, newStatus)
                console.log('dailyData', dailyData)

                return;
            } else {
                console.log("hey early clicker");
                dispatch(TOGGLE_REMINDER_CLICK_TOO_EARLY())
            }
        }
        // update the progress level in the databse
        // const response = await WAPPRequest('/data/daily', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     progress: calculateProgress,
        //     status: newStatus,
        //   }),
        // }); 

      }

    return (
        <li
            className={styles.li}
            style={{ height: `${height}%`, width: `${width}%` }}
        >
            <button
                disabled={DISABLED[index] ? true : false}
                className={styles.btn}
                style={{
                    backgroundColor: `#98ddfc${percent}`,
                    width: `${percent}%`,
                    height: length >= 10 ? `${percent/2.25}px` : length >= 7 ? `${percent/1.5}px` : `${percent}px` 
                    // height: `${percent}px`,
                }}
                onClick={(event) =>  handleClick(event, index)}
            >
                <span>
                    <span
                        style={{
                            color: 'rgba(0, 0, 0, 0.331)', fontSize: index === 0 ? "8px" : "12px", transform: 'rotate(90deg)',
                        }}
                    >
                        {STATUS && STATUS[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} / {' '}
                        {/* {STATUS[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} / {' '} */}
                        {amt.toFixed(0)} fl oz
                    </span>
                </span>
            </button>
            <div className={styles.div}>
                <span
                    className={styles.span}
                    id="timeline-display"

                    style={{ color: `${DISABLED[index] ? '#00000030' : '#000000'}` }}
                >
                    {time <= 12 ? time : time - 12} {time < 12 ? 'am' : 'pm'}
                    {/* {time <= 12 ? time : time - 12}:00 {time < 12 ? 'am' : 'pm'} */}
                </span>

                {
                    DISABLED[index] === true && <div className="timeline-hover">
                    <img id={styles.barWaterDrop} src={STATUS[index] === 'check' ? waterDrop : bg} /></div>
                    }
            </div>
        </li>
    )
}
