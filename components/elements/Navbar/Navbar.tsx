import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import CSS from '../../../utility/CSS'
import PromiseFunc from '../../../utility/PromiseFunc'
import MathRandom from '../../../utility/MathRandom'
import getItemWithExpiration from '../../../utility/getItemWithExpiration'
import Boop from '../../../utility/ParentchildParent/Boop'
import {useImage} from '../../../utility/Contexts/ImgContext'
import linkUserWithGoogle from '../../../utility/fetch/linkUserWithGoogle'
import axios from 'axios'
import allUrl from '../../../utility/fetch/allDBurl'

import { TOGGLE_HYDRO_SETTINGS, SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_USER_ICON_CONFIRM, SET_PROGRESS, TOGGLE_WEATHER_CHANNEL } from '../../../redux/actions'
import ConnectedSignupLoginChecker from '../SignupLoginChecker';
import Container from 'react-bootstrap/Container'

// import $ from 'jquery'

// import Profile from '../Profile';
 function Navbar(props:any) {
  const dispatch = useDispatch()

  const { 
    HYDRO_DATA, SPIN_BOTTLE_SEARCHING, ICON_NOT_INPUT, SELECT_ICON_SCREEN, NON_GOOGLE_IMG_URL, USER_ICON_CONFIRM, APP_PAGE_ICON_CONFIRM, HYDRO_SCHEDULE, DATE, PROGRESS, STATUS, DISABLED,
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE, SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_USER_ICON_CONFIRM, SET_PROGRESS, TOGGLE_WEATHER_CHANNEL,
   } = props

  const { msgBottle, smallDroplet, home, exit, statistics, settings, mouseWaterCup, cup, drink, bottle, bottles, clouds } = useImage()

  const [loginType, setLoginType] = useState("")
  let location = window.location
  let href:string = location.href;
  let pathname:string = location.pathname;
  

  let navbardropletJQ:any;
  let navbardropletID:string
  let msgbottleJQ:any;
  let msgbottleID:string
  let bothElemById:any
  
  if (typeof window !== 'undefined') {
    CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
      $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
  }

//   const Boop = ({ rotation, timing, children }) => {
    const [isBooped, setIsBooped] = useState(false);

  useEffect( () => {  
    navbardropletJQ = $('#navbar-droplet')[0]
    navbardropletID = navbardropletJQ.id
    msgbottleJQ = $('#msg-bottle')[0]
    msgbottleID = msgbottleJQ.id
    bothElemById = [navbardropletID,msgbottleID].join(" ")

  }, [])

  const homeclick = () => { window.location.href = "/"}
  const statclick = () => {  window.location.href = "/dashboard" }
  const doorclick = () => { 
    console.log("clicking the door please")

    let preuser = localStorage.getItem("currentuser")
    if (preuser !== null) {
      console.log("hey good sir")    

      localStorage.removeItem("currentuser")
      localStorage.removeItem("wateruser")
      localStorage.removeItem("loginuser")
      localStorage.removeItem("user")
      localStorage.removeItem("login")
    } else {
      console.log("else block please")      
    }
    window.location.href = "/loginoutgoogle"
}

  const settingsclick = () => {  
    let noslashregex = /\//
      let slashlesspathname:string = pathname.replace(noslashregex, '')            
    if (slashlesspathname === "dashboard") {    // i dont want to redirect to settings if one were to click on the gear from the login screen. it doesn't make sense you should be logged in.
      localStorage.setItem('settingsDuringDashboard', 'yes')
      window.location.href = "/"
    } else {
      TOGGLE_HYDRO_SETTINGS()
    } 
  }

  const test = async () => {
    let urlbank = await allUrl()
    let env = urlbank.ENVdata.data.ENV
    let miz:string = "mastermizery".replace(/\s/g, '')
    let googleId:string = '117827387775507687118'.replace(/\s/g, '')
    let icon:string = 'https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c'.replace(/\s/g, '')
    await localStorage.setItem("icon", icon)
    let storageIcon = await localStorage.getItem("icon")    
    let href:string = `http://localhost:5000/`

    let args = `(name:"mastermizery",googleId:"117827387775507687118",imageUrl:"https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c")`

    // const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${miz}`)}",icon:"${encodeURIComponent(`${storageIcon}`)}",googleId:"${encodeURIComponent(`${googleId}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!
    let predata = await linkUserWithGoogle(miz, googleId, storageIcon)
    
    const data = await predata
    console.log('data')
    console.log(data)
    // const predata = await fetch(`http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,age}}`)
  }

  const test2 = async () => {
    console.log('HYDRO_SCHEDULE')
    console.log(HYDRO_SCHEDULE)

    // let predata = await fetch(`http://localhost:5000/fill_cont?query={allDBsettings{id,weight,height,age,reminder,start_time,end_time,reminder,activity,users_id}}`)
    let predata = await fetch(`http://localhost:5000/fill_cont?query={allDBusers{id,googleId,icon,username,email,password,age}}`)
    let data = await predata.json()
    console.log('data')
    console.log(data)
    
        //  return { id, weight, height, age, reminder, start_time, end_time, reminder, activity, users_id } = settings 
        // return { id, googleId, icon, username, email, password, age } = allusers
    

  }

  const test3 = async () => {
    const prekey = await axios.get('http://localhost:5000/fill_cont?query={ENV_WEATHER}')
    const key = prekey.data.data.ENV_WEATHER
    console.log('prekey')
    console.log(prekey)

    let city:string = 'bergenfield'

    // get input from user on city name to be used at the end of the /locations/ query so described below:       &q=bergenfield&offset=25

    const rainPROMISE = new Promise(async (resolve:any, reject:any) => {
      const pre_data = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}&offset=25`)    
      // const pre_data = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=CG0C6JlnXhBUOi4R9JlJILWZGyBP6LkD&q=bergenfield&offset=25')    
      const weatherdata = await pre_data.data[0]
      let locationKey:string = weatherdata.Key
  
      const currentLocationConditions = await  axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`)      
      resolve(currentLocationConditions ? currentLocationConditions : "no weather conditions or no city or both")
    })
    rainPROMISE
    .then( (todayCityConditions:any) => {
          console.log('todayCityConditions')
          console.log(todayCityConditions)
          let rainToday = todayCityConditions.data[0].HasPrecipitation
          console.log('rainToday')
          console.log(rainToday)
    })
    
    



    


  }


    const testuser = { username: 'test', email: 'test', password: 'test', age: 'test', GOOGLE_ID: 'GOOGLE_ID' }

    const spinbottlefunc = async () => {
          const loadingicons:string[] = [cup, drink, bottle, bottles, mouseWaterCup]
          const randomIcon = MathRandom(loadingicons)
          console.log('randomIcon')
          console.log(randomIcon)          

          let allURL = await allUrl()
          let ENV = allURL.ENVdata.data.ENV
          let API:string = ENV.API
          let APIsplit = API.split('***')
          let localAPI = APIsplit[0]
          let prodAPI = APIsplit[1]

          TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
        }

    const sike = () => { return }

    const cloudhover = () => {
        console.log('9')        
        TOGGLE_WEATHER_CHANNEL()
    }


  return (
    <Container className="navbar-container"
    >
    <div className="logo">
    <img style={{ border: 'none' }} className={bothElemById} id="navbar-droplet" src={smallDroplet} />    
    
    
    <img 
    onMouseEnter={location.pathname === "/dashboard" ? cloudhover : sike}
    onClick={SELECT_ICON_SCREEN ? sike : spinbottlefunc} className={pathname === "/loginoutgoogle" && !SPIN_BOTTLE_SEARCHING && ICON_NOT_INPUT ? "Msg-Bottle-Animation" :  "" } style={{ border: 'none' }} id="msg-bottle"  src={ location.pathname === "/dashboard" ? clouds : msgBottle} />
     {/* <button onClick={test2} style={{ backgroundColor: 'moccasin', border: '1px dashed peachpuff' }}> </button>  */}
     {/* <button onClick={test3} style={{ margin: '0 2em', backgroundColor: 'coral', border: '1px dashed dodgerblue' }}> </button>   */}
    </div>
      
      <div className="logo">
          <img onClick={homeclick} src={home} />
          <img onClick={statclick} src={statistics} />
          <img onClick={settingsclick} src={settings} />          
          {/* <img onClick={doorclick} src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />            */}
          <img id="loginLogoutIcon" onClick={doorclick} src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM && APP_PAGE_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />           
      </div>
 
    </Container>
  );
}

const mapStateToProps = (state:any) => ({
    HYDRO_SETTINGS: state.HYDRO_SETTINGS,
    HYDRO_DATA: state.HYDRO_DATA,
    LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
    GOOGLE_LINK_ACCT_SCREEN: state.GOOGLE_LINK_ACCT_SCREEN,


    USERNAME_INPUT: state.USERNAME_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    GOOGLE_ID_INPUT: state.GOOGLE_ID_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    AGE_INPUT: state.AGE_INPUT,
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL,
    NON_GOOGLE_IMG_URL: state.NON_GOOGLE_IMG_URL,
    SPIN_BOTTLE_SEARCHING: state.SPIN_BOTTLE_SEARCHING,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    SELECT_ICON_SCREEN: state.SELECT_ICON_SCREEN,
    USER_ICON_CONFIRM: state.USER_ICON_CONFIRM,
    APP_PAGE_ICON_CONFIRM: state.APP_PAGE_ICON_CONFIRM,
    ONLINK_GOOGLE_CONFIRM_DATA: state.ONLINK_GOOGLE_CONFIRM_DATA,
    HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
    DATE: state.DATE,
    PROGRESS: state.PROGRESS,
    STATUS: state.STATUS,
    DISABLED: state.DISABLED,    
    // TOGGLE_BORDER_40_WATER_LIFE
    
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING()),
    TOGGLE_SPIN_BOTTLE_SHOW_INPUT: () => dispatch(TOGGLE_SPIN_BOTTLE_SHOW_INPUT()),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action)),
    TOGGLE_WEATHER_CHANNEL: () => dispatch(TOGGLE_WEATHER_CHANNEL())
})

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default ConnectedNavbar

// const mapStateToProps = (state: any) => ({
//   water: state.water,
//   API_URL: state.API_URL,
//   settings: state.settings,
//   LOGIN_TYPE: state.LOGIN_TYPE,
//   ENV: state.ENV,
//   USER: state.USER
// });

// const mapDispatchToProps = (dispatch:any) => ({
//       togglesettings: (setting:any) => dispatch(TOGGLE_SETTINGS(setting))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
