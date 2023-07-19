// next related imports to get page up and running:
import Link from 'next/link'
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dotenv from "dotenv"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import $ from 'jquery'

// load env variables for prisma
dotenv.config();

// styling
import 'styles/globals.css';

// Contexts
import { ImgProvider } from 'Contexts/ImgContext';

// components
import 'components/elements/Navbar/navbar.css';
import Navbar2 from 'components/elements/Navbar/Navbar2';
import Container from 'react-bootstrap/Container';
import Main from 'components/webpage/Main/Main';

// redux state management:
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useStore } from 'react-redux'
import { useSelector, useDispatch } from "react-redux"
import rootReducer from 'redux/store/rootReducer';
import {  SET_ALL_USERNAMES } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils.js
import {useImage} from "Contexts/ImgContext"

const store = configureStore({
  reducer: rootReducer,
});

export default function App({ Component, pageProps }: AppProps) {

  const { mouseDroplet } = useImage()

  useEffect( () => {    
  }, [])
  

  const test = () => {
    // Test function logic
    console.log("we are testing");
    const hydroSettings = store.getState().main.HYDRO_SETTINGS
    console.log('hydroSettings')
    console.log(hydroSettings)
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ cursor: `url("${mouseDroplet}"), auto` }} className="App">
      {/* <div style={{ cursor: `url('${mouseDroplet}')`, border: '5px solid green' }} className="App"> */}
        <Provider store={store}>
          <ImgProvider>          

            <Container className="navbar">
              <Navbar2 />
            </Container>
                        
              <Component {...pageProps} />

          </ImgProvider>
        </Provider>
      </div>
    </>
  );
}
