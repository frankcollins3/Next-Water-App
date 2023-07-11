// next related imports to get page up and running:
import type { AppProps } from 'next/app';
import Head from 'next/head';

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
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useStore } from 'react-redux'
import rootReducer from 'redux/store/rootReducer';


const store = configureStore({
  reducer: rootReducer,
});


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
      <div className="App">
        <Provider store={store}>
          <ImgProvider>
            <Container className="navbar">
              <Navbar2 />
            </Container>
            <Main>
              <Component {...pageProps} />
            </Main>
            <button onClick={test} style={{ backgroundColor: 'purple', borderRadius: '50%', height: '100px', width: '100px' }}></button>
          </ImgProvider>
        </Provider>
      </div>
    </>
  );
}
