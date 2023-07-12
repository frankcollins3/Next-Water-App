import React, { useEffect } from 'react';
import axios from 'axios'
import styles from './Main.module.scss';

// components
import Dropinbucket from 'components/elements/DropInBucket';
import Container from 'react-bootstrap/Container';

// redux state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_HYDRO_SETTINGS } from 'redux/main/mainSlice'

// utility functions
import WaterRequestRead from "utility/WaterRequestRead"
// import testfunc from "pages/api/test"

// graphql queries 
import {allDBsettingsquery} from "graphql/queries"

export default function Main(props: any) {
  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const HYDRO_SETTINGS = useSelector((state: RootState) => state.main.HYDRO_SETTINGS);

  
  return (
    <Container id={styles.Page_1}>
      <RenderMain HYDRO_SETTINGS={HYDRO_SETTINGS} />
    </Container>
  );
}

function RenderMain({ HYDRO_SETTINGS }: { HYDRO_SETTINGS: boolean }) {
  const dispatch = useDispatch()

  const yestest = async () => {

    dispatch(TOGGLE_HYDRO_SETTINGS())

//  const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
   
    // works
axios
  .post('/api/graphql', {
    query: `
      query {
        addUserSettings(
          id: 3,
          age: 25,
          height: 90,
          weight: 190,
          start_time: 2,
          end_time: 10,
          reminder: 1,
          activity: 1,
          users_id: 3
        ) {
          id
          age
          height
          weight
          start_time
          end_time
          reminder
          activity
          users_id
        }
      }
    `
  })
  .then((response) => {
    console.log('Response:', response.data);
    // Process the response data
  })
  .catch((error) => {
    console.log('Error:', error);
    // Handle the error
  });

    
} // end of yestest

  return (
    <>
      <Container className={styles.primary}>
        <div className={styles.display}>
          {/* <p style={{ color: 'black'}}> display </p> */}
          <Dropinbucket />
        </div>

        <Container className={styles.schedule}></Container>
      </Container>

      <Container className={styles.panel}>
        <button onClick={yestest}> test me! </button>
        {/* Use the hydroSettings state here */}
        { HYDRO_SETTINGS === true && <Dropinbucket></Dropinbucket> }
        {/* <p> { HYDRO_SETTINGS === true ? "yes" : "no" } </p> */}
        {/* {hydroSettings && <p> panel </p>} */}
      </Container>
    </>
  );
}
