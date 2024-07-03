import React, { useEffect } from 'react';
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import WaterThoughts from "components/elements/WaterThoughts"
import styles from './DisplayWave.module.scss'

// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SHOW_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS, TOGGLE_INTRO_WATER_DROP_IS_HOVERED } from 'redux/main/mainSlice'
import { TOGGLE_IS_LOGGED_IN } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { useImage } from "Contexts/ImgContext"


export default function DisplayWave() {
    return <RENDER />
}

function RENDER() {
    return (
        <Container id={styles.container}>
            <div className={styles.wave01}> </div>
            <div className={styles.wave02}> </div>
            <div className={styles.wave03}> </div>
            {/* <div className="sun"> </div> */}
        </Container>
    )
}