import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
// import WAPPRequest from '../../utils';
import Spinner from '../Spinner';
import StreakDay from '../StreakDay/StreakDay';
import currentuserJSONparse from '../../../utility/currentuserJSONparse'
import {useImage} from '../../../utility/Contexts/ImgContext'
import getAllUserData from '../../../utility/fetch/getAllUserData'
import './streak.css';

export default function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [localContHover, setLocalContHover] = useState(false)

  const { mouseDroplet, puppetCup, confirmation, close } = useImage()



  useEffect(() => {
   (async() => {
      let currentUser = await currentuserJSONparse()
      let currentuserID = currentUser.id
      let currentUserDataArray = await getAllUserData(currentuserID)
      let dataLength = currentUserDataArray.length
      console.log('currentUserDataArray')
      console.log(currentUserDataArray)

      if (currentUserDataArray) {
        // also can start by finding the last day, seeing if it was perfect, and starting a new streak if it's not.

        let start = dataLength < 7 ? 0 : dataLength - 7
        let dataslice = currentUserDataArray.slice(start, dataLength)
        setStreakData(dataslice)
      } else { return }
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
      <li key={index}>
        <img style={{ height: '15px', width: '15px', margin: '0 0.25em'}} src={day.progress === 100 ? confirmation : close}/>
        {/* <pre style={{ height: '15px', width: '15px', margin: '0 0.25em'}}> { day.progress } </pre> */}
        {/* <pre style={{ height: '15px', width: '15px', margin: '0 0.25em'}}> I </pre> */}
        
        
      </li>
    ));
  };

  const renderStreakExplain = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <img style={{ height: '35px', width: '35px'}} src={puppetCup}/>
      </div>
        )
  }

  const contHoverFunc = () => {
      setTimeout( () => setLocalContHover(true), 1000)
      setTimeout( () => setLocalContHover(false), 3000)
  }

  return (
    <div className="streak-container">
        {
    localContHover === false ? <ul onMouseLeave={contHoverFunc}>{streakData.length > 0 && <>{renderStreak()}</>} </ul> : <ul>{streakData.length > 0 && <>{renderStreakExplain()}</>} </ul> 
        }          
    </div>
  );
}
