import React from 'react';

// components and styles
import Reminder from 'components/elements/Reminder';
import Container from 'react-bootstrap/Container'
import UpdateDataThumb from "components/elements/UpdateDataThumb"
import styles from "./Schedule.module.scss"
// @redux/toolkit global state management

// utils
import {useImage} from "Contexts/ImgContext"

import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE } from 'redux/main/mainSlice'

export default function Schedule(props:any) {

  const { like } = useImage()

  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)  

  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const STATUS = useSelector( (state:RootState) => state.main.STATUS)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)  
  const REMINDER_FINISHED_UPDATE = useSelector( (state:RootState) => state.main.REMINDER_FINISHED_UPDATE)
  
  const renderSchedule = () => {
          // <img style={{ height: "50px", width: "50px" }} src={like}/                              
      return HYDRO_SCHEDULE.map((time:any, index:number) => (            
      <Reminder
        key={index}
        time={time} 
        // lets see you do it now 
        amt={(HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1)}
        amtper={HYDRO_INTAKE / HYDRO_SCHEDULE.length}
        percent={Math.floor(
            (((HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1)) / HYDRO_INTAKE) *
              100 -
              1
          )}
          index={index}
          status={STATUS}
          disabled={DISABLED}
      />
    ))
  };

  const renderLikeUpdate = () => {
    return (
      <UpdateDataThumb/>
    )
  }

  return (
    //  <Container className="schedule-container">     
    <>     
      {
        REMINDER_FINISHED_UPDATE
        ? renderLikeUpdate()
        : renderSchedule()
      }

      
      {/* <>{renderSchedule()}</> */}
      {/* <ul>{renderSchedule()}</ul> */}
      
    </>
    // </Container>
  );

  // return <RENDER hydroSchedule={}/>
}

// return HYDRO_SCHEDULE.map((time:any, index:number) => (
      
    //   <Reminder
    //     key={index}
    //     time={time} 
    //     // lets see you do it now 
    //     amt={(HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1)}
    //     amtper={HYDRO_INTAKE / HYDRO_SCHEDULE.length}
    //     percent={Math.floor(
    //       (((HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1)) / HYDRO_INTAKE) *
    //         100 -
    //         1
    //     )}
    //     index={index}
    //     status={STATUS}
    //     disabled={DISABLED}
    //   />
    // ));