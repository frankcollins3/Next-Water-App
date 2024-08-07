// next related imports to get page up and running:
import Link from 'next/link'
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dotenv from "dotenv"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

// load env variables for prisma
dotenv.config();

// styling
import 'styles/globals.css';

// Contexts
import { ImgProvider } from 'Contexts/ImgContext';
import { PromiseProvider } from 'Contexts/Promises';

// components
import 'components/elements/Navbar/navbar.css';
import Navbar2 from 'components/elements/Navbar/Navbar2';
import Credits from "components/elements/Credits"
import Container from 'react-bootstrap/Container';
import Main from 'components/webpage/Main/Main';

// redux state management:
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {RootState} from "redux/store/rootReducer"
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

  const [mainBorderHover, setMainBorderHover] = useState(false)
  // const [localCurrentUsername, setLocalCurrentUsername] = useState('')

  const { mouseDroplet } = useImage()
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* could pass local props up and have {bg} the empty drop be the cursor if NO CURRENT_USER but want to move back on other project... */}
      <div style={{ cursor: `url("${mouseDroplet}"), auto` }} className="App">
        <Provider store={store}>
          <ImgProvider>          
          <PromiseProvider> 

              <Navbar2 />              
              
        <Component {...pageProps} />
                                
              <Credits/>    



          </PromiseProvider>         
          </ImgProvider>
        </Provider>
      </div>
    </>
  );
}
