import {useState, useEffect} from 'react'
import $ from 'jquery'
import axios from 'axios'


// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./WebIconBoatGrid.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {TOGGLE_SELECTED_WEB_ICONS, TOGGLE_IMG_SCRAPE_LOADING } from "redux/icons/iconsSlice"
import {SET_NON_GOOGLE_IMG_URL } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import {useImage} from "Contexts/ImgContext"
import { flexPropertyColumnCombo, attributeJQ, nothingFunc} from 'utility/UtilityValues'

export default function WebIconBoatGrid() {

  const dispatch = useDispatch()


  const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL);
  const SELECTED_WEB_ICONS = useSelector((state: RootState) => state.icons.SELECTED_WEB_ICONS);
  const IMG_SCRAPE_LOADING = useSelector((state: RootState) => state.icons.IMG_SCRAPE_LOADING);
      

    const { puppetCup, boat } = useImage()

    const [showInput, setShowInput] = useState(false) 

    const FakeClick = async (event: any) => { 
          
        let key: string = event.key;          
        let value: string = event.target.value;

        if (key === ' ') { $('.puppeteerInput').val('') }                       
        if (key === 'Enter') {            
          let value:string = `lightblue${event.target.value}`   
          console.log('value', value)
          
          const puppetPROMISE = new Promise(async(resolve:any, reject:any) => {
            $('.boat').addClass(styles.moveBoat)
            dispatch(TOGGLE_IMG_SCRAPE_LOADING())   
            setShowInput(false)
            let puppeteerdata = await axios.post('/api/graphql', {query:`query { puppeteer(searchTerm: "${value}") }`} )
            resolve(puppeteerdata) // reject will never run because this will still return the error. would have to do puppeteerdata.data.puppeteer ? reject('no data!')
            // reject('nodata')
        })  
        // const prepuppet:any = await puppetPROMISE
        puppetPROMISE
        .then( (prepuppet:any) => {
          $('.boat').removeClass(styles.moveBoat)      
        const puppetImg:string|null = prepuppet.data.data.puppeteer       
        console.log('prepuppet', prepuppet)
        console.log('puppetImg', puppetImg)
        dispatch(TOGGLE_IMG_SCRAPE_LOADING()) 
        dispatch(TOGGLE_SELECTED_WEB_ICONS())
        dispatch(SET_NON_GOOGLE_IMG_URL(puppetImg))        
        })
        }
      }

      const inputShowHover = () => {
        if (IMG_SCRAPE_LOADING === false) { setShowInput(true)}
      }

      const inputShowLeave = () => {
        if (IMG_SCRAPE_LOADING === false) { setShowInput(false) }
      }
    


    const RENDER = () => {
        return (
            <>
            {/* <img src={puppetCup}/> */}
<Container className={flexPropertyColumnCombo} onMouseEnter={inputShowHover} onMouseLeave={inputShowLeave}
style={{ background: `url('${puppetCup}') no-repeat center / cover`, height: '50vh', width: '50vw', justifyContent: 'center', alignItems: 'center'}}>
{/* <Container className={flexPropertyColumnCombo} style={{ background: `url('${puppetCup}') no-repeat center / cover`, height: '50vh', width: '50vw' }}> */}
            <img className="boat" id={styles.boat} src={SELECTED_WEB_ICONS ? NON_GOOGLE_IMG_URL : boat}/>
            { showInput && <input className="puppeteerInput" onKeyDown={FakeClick} id={styles.input} type="text"/> }
            </Container>

            </>
        )
    }
    return <Container id={styles.meIconContainer}> {RENDER()} </Container>
    // return <Container> {RENDER()} </Container>
}

