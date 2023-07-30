import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import WAPPRequest from '../../utils';

// components and styles
// import Spinner from '../Spinner';
// import StreakDay from '../StreakDay/StreakDay';
import styles from "./Streak.module.scss"

// utils
import {useImage} from 'Contexts/ImgContext'
import {usePromise} from 'Contexts/Promises'
import {getAllUserDataQueryString} from "graphql/queries"



export default function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [localContHover, setLocalContHover] = useState(false)

  const { mouseDroplet, puppetCup, confirmation, close } = useImage()
  const { iPROMISEcookies } = usePromise()



  useEffect(() => {
   (async() => {

    iPROMISEcookies()
    .then( (cookie) => {
      const ID = parseInt(cookie)
      axios.post('/api/graphql', {
        query: `query {
          allUserData(users_id: ${ID}) {
            google_id
            date
            progress
            weekday
            status
            users_id
          }
        }`,
      }).then( (userData) => {
        const currentUserDataArray = userData.data.data.allUserData
        console.log('currentUserDataArray')
        console.log(currentUserDataArray)  
        if (currentUserDataArray) {
          let dataLength = currentUserDataArray.length
          let start = dataLength < 7 ? 0 : dataLength - 7
          let dataslice = currentUserDataArray.slice(start, dataLength)
          setStreakData(dataslice)
        } else { return }        
      })
    })

   })()

  }, []);

  const renderStreak = () => {
    if (loading) {
      // return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }
    return streakData.map((day, index) => (
      <div key={index}>
        <img style={{ height: '15px', width: '15px', margin: '0 0.25em', alignSelf: 'center' }} src={day.progress === 100 ? confirmation : close}/>                        
      </div>
    ));
  };

  const renderStreakExplain = () => {
    return (
      <div style={{ height: '15px', width: '15px', margin: '0 0.25em', alignSelf: 'center' }}>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}> */}
        <img style={{ height: '35px', width: '35px' }} src={puppetCup}/>
      </div>
        )
  }

  const contHoverFunc = () => {
      setTimeout( () => setLocalContHover(true), 1000)
      setTimeout( () => setLocalContHover(false), 3000)
  }

  return (
    <div className={styles.streakContainer}>
        {/* {
    localContHover === false ? <ul className={styles.ul} onMouseLeave={contHoverFunc}>{streakData.length > 0 && <>{renderStreak()}</>} </ul> : <ul>{streakData.length > 0 && <>{renderStreakExplain()}</>} </ul> 
  } */}
  {
    localContHover === false 
    ? <ul className={styles.ul} onMouseLeave={contHoverFunc}>{streakData.length > 0 && <>{renderStreak()}</>} </ul> 
    : <ul className={styles.ul}> {renderStreakExplain()} </ul>
    
  }

        {/* <h1 style={{ color: 'dodgerblue' }}> hey </h1> */}
    </div>
  );
}
