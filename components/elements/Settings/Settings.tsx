import React, { useEffect, useState } from 'react';
import axios from "axios"
// import Spinner from '../Spinner';

// components and styles
import styles from "./Settings.module.scss"
import Container from "react-bootstrap/Container"

// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import 
{  SET_HYDRO_INTAKE, SET_AGE, SET_WEIGHT, SET_HEIGHT, SET_START_TIME, SET_END_TIME, SET_REMINDER, TOGGLE_LOADING, SET_UPDATE_RESET_HOVER, SET_UNITS, } from 'redux/main/mainSlice'


// utils
import {usePromise} from "Contexts/Promises"
import {SettingsInterface} from "utility/interfaceNtypes"
import { deleteUserSettingsQueryString, addUserSettingsQueryStringFunc } from 'graphql/queries';
import addUserSettingsFunc from "utility/fetch/addUserSettingsFunc"
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula"

export default function Settings() {

  const dispatch = useDispatch()
  const { iPROMISEcookies} = usePromise()

  const AGE = useSelector( (state:RootState) => state.main.AGE)
  const HEIGHT = useSelector( (state:RootState) => state.main.HEIGHT)
  const WEIGHT = useSelector( (state:RootState) => state.main.WEIGHT)
  const START_TIME = useSelector( (state:RootState) => state.main.START_TIME)
  const END_TIME = useSelector( (state:RootState) => state.main.END_TIME)
  const REMINDER = useSelector( (state:RootState) => state.main.REMINDER)
  const UNITS = useSelector( (state:RootState) => state.main.UNITS)
  const LOADING = useSelector( (state:RootState) => state.main.LOADING)
  const UPDATE_RESET_HOVER = useSelector( (state:RootState) => state.main.UPDATE_RESET_HOVER)

  const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
  const NON_GOOGLE_IMG_URL = useSelector( (state:RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)


  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const HYDRO_DATA = useSelector( (state:RootState) => state.main.HYDRO_DATA)
  const DATE = useSelector( (state:RootState) => state.main.DATE)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)
  const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
  
  const renderDropdown = (num:any) => {
    const times = new Array(24).fill('');
    times[num] = true;
    return times.map((time, index) => (
      <option key={index} value={index}>{`${index}:00`}</option>
    ));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const updatedSettings = {
      AGE,
      WEIGHT: UNITS === 'imperial' ? WEIGHT : Math.floor(WEIGHT * 2.205),
      HEIGHT: UNITS === 'imperial' ? HEIGHT : Math.floor(HEIGHT / 2.54),
      START_TIME,
      END_TIME,
      REMINDER
    };

    iPROMISEcookies()
    .then(async(cookie) => {
      let IDcookieINT:any = parseInt(cookie)
      const queryStr = addUserSettingsQueryStringFunc(AGE, HEIGHT, WEIGHT, START_TIME, END_TIME, REMINDER, 0, cookie)
      axios.post('/api/graphql', { query: `${queryStr}`})
      .then(async(addedSettings:any) => {
          addedSettings = addedSettings.data.data.addUserSettings
          console.log('addedSettings', addedSettings)
          let intake = await waterIntakeWeightFormula(addedSettings.weight)
          dispatch(SET_HYDRO_INTAKE(intake))                  
      })
      // let userSettings = await addUserSettingsFunc(AGE, HEIGHT, WEIGHT, START_TIME, END_TIME, REMINDER, 0, IDcookieINT)
      // console.log("userSetttings", userSettings)
    })



  };

  const URhover = (event:any) => {
    const id:string = event.target.id
    if (id === "Ubtn") {
      dispatch(SET_UPDATE_RESET_HOVER("Ur Settings"))
    } else if (id === "Rbtn") {
      dispatch(SET_UPDATE_RESET_HOVER("Resettings"))
    }
  }


  const handleReset = async () => {
    iPROMISEcookies()
    .then(async(cookie:any) => {
        const deleteSettingsString = await deleteUserSettingsQueryString(parseInt(cookie))
        console.log('QLstring', deleteSettingsString)
        await axios.post('/api/graphql', { query: `${deleteSettingsString}` })
        .then( (data:any) => {     
            console.log('data', data)
        })
    })
  };

  const test = () => {
    console.log('sched', HYDRO_SCHEDULE)
    console.log('HYDRO_DATA', HYDRO_DATA)
    console.log('HYDRO_INTAKE', HYDRO_INTAKE)
    console.log('DATE', DATE)
    console.log('DISABLED', DISABLED)
    console.log('PROGRESS', PROGRESS)
    console.log('CURRENT_USER', CURRENT_USER)
    console.log('NON_GOOGLE_IMG_URL', NON_GOOGLE_IMG_URL)
  }
      

  const renderSettings = () => {

    return (
      <>
        <Container className={styles.settingsTitle}>SETTINGS</Container>
        <button
          className={styles.unitsBtn}
          style={{ display: UNITS === "imperial" ? "none" : "" }}
          onClick={() => {
            dispatch(SET_UNITS('imperial'));
          }}
        >
          I
        </button>
        <button
        style={{ display: UNITS === "metric" ? "none" : ""}}
          className={styles.unitsBtn}
          onClick={() => {
            dispatch(SET_UNITS('metric'));
          }}
        >
          M
        </button>
        <Container id={styles.unitsText}>{UNITS.toUpperCase()}</Container>

        <form onSubmit={handleSubmit}>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor="age">
              <div>Age</div>
            </label>
            <input
              className={styles.input}
              type="range"
              id="age"
              name="age"
              min="0"
              max="100"
              value={AGE}
              onChange={(e:any) => dispatch(SET_AGE(parseInt(e.target.value)))}
              // onChange={(e:any) => setAge(parseInt(e.target.value))}
            />
            <Container>{AGE}</Container>
          </Container>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor={styles.weightInput}>
              <Container>Weight</Container>
            </label>
            <input
            className={styles.input}
              type="number"
              id={styles.weightInput}
              name="weight"
              min="0"
              max={UNITS === 'imperial' ? '500' : '250'}
              value={WEIGHT}
              onChange={(e) => dispatch(SET_WEIGHT(parseInt(e.target.value)))}
            />
            <Container>
              {UNITS === 'imperial'
                ? `${WEIGHT} lbs`
                : `${WEIGHT} kg`}
            </Container>
          </Container>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor={styles.heightInput}>
              <Container>Height</Container>
            </label>
            <input
              className={styles.input}
              type="number"
              id={styles.heightInput}
              name="height"
              min="0"
              max={UNITS === 'imperial' ? '100' : '275'}
              value={HEIGHT}
              onChange={(e) => dispatch(SET_HEIGHT(parseInt(e.target.value)))}
            />
            <Container>
              {UNITS === 'imperial'
                ? `${Math.floor(HEIGHT / 12)}' ${HEIGHT % 12}`
                : `${HEIGHT} cm`}
            </Container>
          </Container>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor="startTime">
              <Container className={styles.startEndText}>day start:</Container>
            </label>
            <select
              name="startTime"
              id="startTime"
              value={START_TIME}
              style={{ outline: 'none', color: 'silver' }}
              onChange={(e) => dispatch(SET_START_TIME(parseInt(e.target.value)))}
            >
              {renderDropdown(START_TIME)}
            </select>
          </Container>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor="endTime">
              <Container className={styles.startEndText}>day end:</Container>
            </label>
            <select
              name="endTime"
              id="endTime"
              value={END_TIME}
              style={{ outline: 'none', color: 'silver' }}
              onChange={(e) => {
                dispatch(SET_END_TIME(parseInt(e.target.value)));
              }}
            >
              {renderDropdown(END_TIME)}
            </select>
          </Container>
          <Container className={styles.formGroupSettings}>
            <label className={styles.label} htmlFor="reminder">
              <Container className={styles.startEndText}> Notification Intensity</Container>
            </label>
            <input
              className={styles.input}
              type="range"
              id="reminder"
              name="reminder"
              min="1"
              max="5"
              value={REMINDER}
              onChange={(e) => dispatch(SET_REMINDER(parseInt(e.target.value)))}
            />
            <Container style={{ color: 'silver' }}>Every {REMINDER} Hours</Container>
          </Container>
        </form>
        <button style={{ borderRight: 'none' }} onMouseEnter={URhover} onMouseLeave={() => dispatch(SET_UPDATE_RESET_HOVER(''))} className={styles.URbtn} id="Ubtn" type="submit" onClick={handleSubmit}>
          U
        </button>
        <button style={{ borderLeft: 'none' }} onMouseEnter={URhover} onMouseLeave={() => dispatch(SET_UPDATE_RESET_HOVER(''))} className={styles.URbtn} id="Rbtn" onClick={handleReset}>
          R
        </button>
        <h4 onClick={test} id={styles.URsettings} style={{ color: UPDATE_RESET_HOVER ? "#73defe" : "silver" }}> { UPDATE_RESET_HOVER || "U R water" } </h4>
      </>
    );
  };

  return <Container style={{ overflow: 'scroll'}} className={styles.settingsContainer}>{renderSettings()}</Container>
}

// const mapStateToProps = (state:any) => ({
//     AGE: state.AGE,
//     WEIGHT: state.WEIGHT,
//     HEIGHT: state.HEIGHT,
//     START_TIME: state.START_TIME,
//     END_TIME: state.END_TIME,
//     REMINDER: state.REMINDER,
//     ACTIVITY: state.ACTIVITY,
//     UNITS: state.UNITS,
//     LOADING: state.LOADING,
//     UPDATE_RESET_HOVER: state.UPDATE_RESET_HOVER
// })

// const mapDispatchToProps = (dispatch:any) => ({
//     SET_AGE: (action:any) => dispatch(SET_AGE(action)),
//     SET_WEIGHT: (action:any) => dispatch(SET_WEIGHT(action)),
//     SET_HEIGHT: (action:any) => dispatch(SET_HEIGHT(action)),
//     SET_START_TIME: (action:any) => dispatch(SET_START_TIME(action)),
//     SET_END_TIME: (action:any) => dispatch(SET_END_TIME(action)),
//     SET_REMINDER: (action:any) => dispatch(SET_REMINDER(action)),
//     SET_ACTIVITY: (action:any) => dispatch(SET_ACTIVITY(action)),
//     SET_UNITS: (action:any) => dispatch(SET_UNITS(action)),
//     TOGGLE_LOADING: (action:any) => dispatch(TOGGLE_LOADING(action)),
//     SET_UPDATE_RESET_HOVER: (action:any) => dispatch(SET_UPDATE_RESET_HOVER(action)),
// })

