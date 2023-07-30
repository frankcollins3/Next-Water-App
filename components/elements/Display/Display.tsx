import React, { useState, useEffect } from 'react';

// components and styles
// import { animated, useSpring } from 'react-spring';
import styles from "./Display.module.scss"

//  @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector} from "react-redux"

// utils
import {useImage} from "Contexts/ImgContext"

export default function Display() {

  const { bg } = useImage()

  const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)

  useEffect( () => {
    console.log('progress', PROGRESS)
    console.log('math', PROGRESS * 10)
  }, [PROGRESS])

  const [isBooped, setIsBooped] = useState(false);
  const x = 0;
  const y = 0;
  const rotation = 60;
  const scale = 1;
  const timing = 50;

  return (
    <div
        className={styles.progressBar}
        style={{ background: `linear-gradient(0deg, rgba(114,211,254,1) 0%, rgba(255,255,255,0) ${Math.ceil(PROGRESS)}%)` }}
      >
      <img className={styles.displayDrop} src="/water_img/clear-water-drop.png"/>
      </div>
  );
}

{/* <div className={styles.progress}> */}
  {/* {Math.ceil(PROGRESS)}% */}
  {/* hey guys  */}
{/* </div> */}