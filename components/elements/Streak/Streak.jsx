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
        const currentUserDataArray = userData?.data?.data?.allUserData
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
      <ul id={styles.ul} key={index}>
        <img id={styles.img} src={day.progress === 100 ? confirmation : close}/>                        
      </ul>
    ));
  };

  return <div id={styles.streakContainer}> {renderStreak()} </div>
}
