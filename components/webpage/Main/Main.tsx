import React, { useEffect } from 'react';
import axios from 'axios'
import styles from './Main.module.scss';

// components
import Dropinbucket from 'components/elements/DropInBucket';
import Container from 'react-bootstrap/Container';

// redux state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHydroSettings } from 'redux/main/mainSlice'

// utility functions
// import testfunc from "pages/api/test"

export default function Main(props: any) {
  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const hydroSettings = useSelector((state: RootState) => state.main.HYDRO_SETTINGS);

  
  return (
    <Container id={styles.Page_1}>
      <RenderMain hydroSettings={hydroSettings} />
    </Container>
  );
}

function RenderMain({ hydroSettings }: { hydroSettings: boolean }) {
  const dispatch = useDispatch()

  const yestest = async () => {

    const query = `
  query {
    hello
  }
`;

const fetchData = async () => {
  try {
    const response = await axios.post('/api/graphql', {
      query: `
        query {
          pokemon {
            name
          }
        }
      `,
    });
    console.log(response.data);
    // Process the returned data
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    // Handle the error
  }
};


fetchData()
    
}


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
        {/* Use the hydroSettings state here */}
        <p> { hydroSettings === true ? "yes" : "no" } </p>
        <button onClick={yestest}> test me! </button>
        {/* {hydroSettings && <p> panel </p>} */}
      </Container>
    </>
  );
}
