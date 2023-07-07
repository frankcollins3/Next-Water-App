
import React from "react"
import "./LoginOutGoogle.css" 
// import  "./LogInOutGoogle.module.scss"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
import {useState, useEffect} from 'react'

// utility functions
import allDBurl from '../../../utility/fetch/allDBurl'
import elemChildrenJQ from '../../../utility/elemChildrenJQ'
import attributeJQ from '../../../utility/attributeJQ'
import WaterRequest from '../../../utility/WaterRequest'
import setCursor from '../../../utility/setCursor'
import CSS from '../../../utility/CSS'
import RegexBank from '../../../utility/RegexBank'
import deathCertificate from '../../../utility/deathCertificate'
import isItDeadYet from '../../../utility/isItDeadYet'
import lazyJQanimate from '../../../utility/lazyJQanimate'
import userSignup from '../../../utility/fetch/userSignup'
import linkUserWithGoogle from '../../../utility/fetch/linkUserWithGoogle'
import stringifyItemSetItem from '../../../utility/stringifyItemSetItem'
import parseItemGetItem from '../../../utility/parseItemGetItem'
import addIconLoginLocalStorageUser from '../../../utility/addIconLoginLocalStorageUser'
// import ghostText from '../../../utility/GhostText'
// Context
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'

// components
import ConnectedPasswordInput from '../../../components/elements/PasswordInput'
import ConnectedUsernameInput from '../../../components/elements/UsernameInput'
import ConnectedEmailInput from '../../../components/elements/EmailInput'
import ConnectedAgeInput from '../../../components/elements/AgeInput'
import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'
import ConnectedLoginInput from '../../../components/elements/LoginInputs' 
import SignupInput from '../../../components/elements/SignupInputs' 
import ConnectedCaptcha from '../../../components/elements/Captcha'


import { connect, useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SUBMIT_INPUT_DATA, SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS, TOGGLE_GOOGLE_LINK_ACCT_SCREEN, SET_CURRENT_USER, TOGGLE_NO_LINK_GOOGLE_BTN_HOVER, TOGGLE_YES_LINK_GOOGLE_BTN_HOVER, TOGGLE_YES_LINK_GOOGLE_BTN_CLICK, TOGGLE_NO_LINK_GOOGLE_BTN_CLICK, SET_GOOGLE_IMG_URL, TOGGLE_ICON_NOT_INPUT, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK, SET_LOG_IN_OUT_FLASH_MSG, TOGGLE_USER_ICON_CONFIRM, SET_ONLINK_GOOGLE_CONFIRM_DATA, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT, SET_PASSWORD_INPUT, SET_NODE_ENV, SET_API, SET_LOGIN_MSG, INCREMENT_INCORRECT_LOGIN_ATTEMPT, RESET_INCORRECT_LOGIN_ATTEMPT, TOGGLE_SHOW_FORM } from '../../../redux/actions'
import $ from 'jquery'
// import { Any } from "react-spring"
// client/src/components/elements/LogInOutGoogle/LogInOutGoogle.module.scss // relative path for import above 

 function LogInOutGoogle ( props:any ) {
          
    const { 
            LOGIN_SIGNUP_BTN, DISPLAY_FORM, INPUT_FOCUS, ALL_USERNAMES, USERNAME_INPUT, EMAIL_INPUT, PASSWORD_INPUT, AGE_INPUT, PARENT_CONFIRM, SUBMIT_INPUT_DATA, API, NODE_ENV, LOGIN_MSG, INCORRECT_LOGIN_ATTEMPT, 
            TOGGLE_SUBMIT_INPUT_DATA, GOOGLE_LINK_ACCT_SCREEN, NO_LINK_GOOGLE_BTN_HOVER, EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT,
            YES_LINK_GOOGLE_BTN_HOVER, LINK_GOOGLE_BTN_CLICK, PASSWORD_SHOW, PASSWORD_SHOW_CLICK, LOG_IN_OUT_FLASH_MSG, ONLINK_GOOGLE_CONFIRM_DATA,
                                    
            TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM,  SET_ALL_USERNAMES, SET_CURRENT_USER, SET_ONLINK_GOOGLE_CONFIRM_DATA,
            TOGGLE_NO_LINK_GOOGLE_BTN_HOVER, TOGGLE_YES_LINK_GOOGLE_BTN_HOVER, TOGGLE_YES_LINK_GOOGLE_BTN_CLICK, TOGGLE_NO_LINK_GOOGLE_BTN_CLICK, SET_GOOGLE_IMG_URL,
            TOGGLE_ICON_NOT_INPUT, TOGGLE_PASSWORD_SHOW_CLICK, SET_LOG_IN_OUT_FLASH_MSG, TOGGLE_USER_ICON_CONFIRM, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, SET_USERNAME_INPUT, SET_AGE_INPUT, SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_NODE_ENV, SET_API, SET_LOGIN_MSG, INCREMENT_INCORRECT_LOGIN_ATTEMPT, RESET_INCORRECT_LOGIN_ATTEMPT
          } = props

    const { blueGoogle, multiColorG, hand } = useImage()

    const { APIsplit } = useRegex()

    const googleLinkBtnClass = ["row", "google-link-btn"].join(" ");
    const environment = process.env.NODE_ENV
          
    const dispatch = useDispatch()

    let urlbank:any;
    let allDBusersURL
    let api;
    let env;
    let clientId:any;

    const onSignupSuccess = (res:any) =>  { 
        console.log('res')
        console.log(res)        
        // create state and handle accessing user 
        // change the form in the middle to be the login user button. 
    }
        
    const onFailure = (res:any) => { console.log("hey failure") }

    useEffect( () => {
        (async() => {
            urlbank = await allDBurl() 
            
            console.log('urlbank')
            console.log(urlbank)

            env = urlbank.ENVdata.data.ENV  
            let pre_api = env.API.split(APIsplit)
            console.log('pre_api')
            console.log(pre_api)
            let api = "http://localhost:5000/"
            SET_API( {payload: api})
            // SET_API( {payload: environment === 'development' ? 'http://localhost:5000/' : pre_api[1]})
            // SET_API( {payload: env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]})
            SET_NODE_ENV( { payload: env.NODE_ENV })
            allDBusersURL = urlbank.allDBusersURL
            console.log('allDBusersURL')
            console.log(allDBusersURL)
          
          let options = { headers: 'AllUsers' }

        //   fill_cont?query={allDBusers{id,googleId,icon,username,email,password,age}
        // return { id, googleId, icon, username, email, password, age } = allusers

        //   let allUsers = await fetch('http://localhost:5000/fill_cont?query={allDBusers{id,googleId,icon,username,email,password,age}')
        // webpack fix url possibly!
          let predata = await fetch(`http://localhost:5000/fill_cont?query={allDBusers{id,googleId,icon,username,email,password,age}}`)
        //   let predata = await fetch(`${API}/fill_cont?query={allDBusers{id,googleId,icon,username,email,password,age}}`)
          let allUsers = await predata.json()
          console.log('allUsers')
          console.log(allUsers)
          let allUsersData = allUsers.data.allDBusers
          
        //   let allUsers = await WaterRequest(allDBusersURL, options, undefined)
        //   let allUsers = await WaterRequest(allDBusersURL, options, undefined)
                    
        //   let allUsersData = allUsers.data.allDBusers
          let allUsernames = allUsersData.filter((data:any) => data.hasOwnProperty('username')).map((data:any) => data.username);          
          
          SET_ALL_USERNAMES({ payload: allUsernames })

          let allEmails = allUsersData.filter((data:any) => data.hasOwnProperty('email')).map((data:any) => data.email)

          $('.submit-faucet').on('mouseenter', (event) => {
            CSS($('*'), 'cursor', `url('/water_img/mouseWaterCup.png'), auto`)           
          })
          $('.submit-faucet').on('mouseleave', (event) => {
            CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png'), auto`)           
          })
                  
          SET_ALL_USERNAMES( {payload: allUsernames })
          SET_ALL_EMAILS( { payload: allEmails })                            
          clientId = env.GOOGLE_ID
                function start() {
            gapi.client.init({
              clientId: clientId,
              // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com',
              scope: ""
            })
          };
        const loadgoogle = () => { gapi.load('client:auth2', start) }
        loadgoogle()
        })()
      }, [])

    const showHideLoginSignupBtn = () => {        
        TOGGLE_LOGIN_SIGNUP_BTN()
        if (DISPLAY_FORM !== "login" || DISPLAY_FORM !== "signup") TOGGLE_SHOW_FORM({payload: ""})
        if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup") {
            console.log('thats kind of cool')
            SET_EMAIL_OR_USERNAME_LOGIN_INPUT( {payload: ''})
            SET_PASSWORD_LOGIN_INPUT( {payload: ''})
            SET_USERNAME_INPUT( {payload: ''})
            SET_PASSWORD_INPUT( {payload: ''})
            SET_EMAIL_INPUT( {payload: ''})
            SET_AGE_INPUT( {payload: ''})

        }
    }
        
    const showform = (event:any) => {
        let targetid:string = event.target.id
        TOGGLE_LOGIN_SIGNUP_BTN()
        TOGGLE_SHOW_FORM({payload: targetid})
    }

    const formhover = async (event:any) => {
        let target:any = event.target
        let children = $(event.target).children()
    }

    const submitFaucetClick = async () => {

        if (DISPLAY_FORM === 'signup') {

        let allUsernames = ALL_USERNAMES
        let username_good:boolean = true
        let email_good:boolean = true
        let password_good:boolean = true
        let age_good:boolean = true

        let usernameinputLength:number = USERNAME_INPUT.length

        const checkinputs = () => {
            if (allUsernames.includes(USERNAME_INPUT)) {
                username_good = !username_good; // toggle state 
                return 'username already exists'
            } else {
                if (usernameinputLength > 6 &&  usernameinputLength < 30 ) {
                    console.log("username length is good")
                } else {
                    console.log("username failed")
                    username_good = false
                }
            }
    
            if (EMAIL_INPUT.includes('@')) {
                if (EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org" ) {
                } else {
                    email_good = false
                }
            } else {
                email_good = false
            }
    
            if (/[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT)) {
                if (/[A-Z]/.test(PASSWORD_INPUT) && /[0-9]/.test(PASSWORD_INPUT)) {
                } else {
                    password_good = false
                }
            } else {
                password_good = false
            }
    
            if (parseInt(AGE_INPUT) > 10) {
            } else {
                if (PARENT_CONFIRM) {
                } else {
                    age_good = false
                }
            }
        }
            const inputCheckingPromise = new Promise( (resolve, reject) => {
                resolve(checkinputs())
                reject(console.log('hey weve got a problem my friend'))
            })

            // this promise checks that the inputs are validated as they are described in signupLoginChecker.tsx for ternary rendering.
            inputCheckingPromise
            .then( () => {
                if (username_good === true && email_good === true && password_good === true && age_good === true) {
                    TOGGLE_SUBMIT_INPUT_DATA()
                    SET_CURRENT_USER( {payload: {id: 0, googleId: '', username: USERNAME_INPUT, email: EMAIL_INPUT, age: AGE_INPUT }})
                } else {
                    return 
                }
            })                 
        } else if (DISPLAY_FORM === 'login' ) {
        let emailOrUsername = encodeURIComponent(EMAIL_OR_USERNAME_LOGIN_INPUT.replace(/\s/g, ''));
        let password = encodeURIComponent(PASSWORD_LOGIN_INPUT.replace(/\s/g, ''));        
        let predata = await fetch(`/fill_cont?query={userLogin(emailOrUsername:"${emailOrUsername}",password:"${password}"){id,googleId,icon,username,password,email,age}}`);
        // let predata = await fetch(`fill_cont?query={userLogin(emailOrUsername:"${emailOrUsername}",password:"${password}"){id,googleId,icon,username,password,email,age}}`);

            // let predata = await fetch(`${API}fill_cont?query={userLogin(emailOrUsername:"${encodeURIComponent(EMAIL_OR_USERNAME_LOGIN_INPUT).trim()}",password:"${encodeURIComponent(PASSWORD_LOGIN_INPUT).trim()}"){id,googleId,icon,username,password,email,age}}`)
            let userLogin = await predata.json()
            if (userLogin.errors) {
                INCREMENT_INCORRECT_LOGIN_ATTEMPT()
                SET_LOGIN_MSG({payload: `No User. Drop in and Signup!`})
            } else if (userLogin.data.userLogin.id === 0) {
                INCREMENT_INCORRECT_LOGIN_ATTEMPT()
                SET_LOGIN_MSG({payload: `Incorrect Attempt: ${INCORRECT_LOGIN_ATTEMPT}`})
            } else {
                delete userLogin.data.userLogin.password    // was going to reassign this object path to userLogin but [addIconLoginLocalStorageUser] needs access to that path. leaving for now.
                let icon = userLogin.data.userLogin.icon || '/water_img/hand.png'
                const storagePromise = new Promise( (resolve:any, reject:any) => {
                    localStorage.setItem("login", userLogin ? "login" : "reject")
                    localStorage.setItem("loginuser", JSON.stringify(userLogin))
                    let testuser:any = localStorage.getItem('loginuser')
                    if (testuser != null) {
                        let user = JSON.parse(testuser)
                        resolve(user ? user : "rejection")
                    } else { return SET_LOGIN_MSG( { 
                        payload: `No user, sorry! Signup Please!`                        
                    }) 
                }       
            })
            storagePromise.then( (data:any) => { window.location.href = "/" })
            }                                  
        }
    }
            const noLinkGoogleHoverToggleDrop = () => { TOGGLE_NO_LINK_GOOGLE_BTN_HOVER() }
            const yesLinkGoogleHoverToggleDrop = () => { TOGGLE_YES_LINK_GOOGLE_BTN_HOVER() }
            const linkGoogleReject = () => {
                const urlPROMISE = new Promise((resolve, reject) => {
                    console.log('in the URL promise')
                    let localURL = allDBurl()
                    resolve(localURL)
                    reject([])
                })
//  client/utility/fetch/userSignup --------> redux state holds the USERNAME_INPUT, AGE_INPUT etc -------->  func toggle redux state: <GoogleLogin> to appear ----> onSuccess={onLinkSuccess} which were in now.
                urlPROMISE.then( (urldata:any) => {
                    console.log('urldata in urlPROMISE .then()')
                    console.log(urldata)
                    let localNODE_ENV = urldata.ENVdata.data.ENV.NODE_ENV                    
                    console.log('localNODE_ENV')
                    console.log(localNODE_ENV)
                    const saveUserPROMISE = new Promise( (resolve, reject) => {
                        let userSignupURL = urldata.userSignupURL
                        resolve(userSignup({ googleId: '', icon: '', username: USERNAME_INPUT, email: EMAIL_INPUT, password: PASSWORD_INPUT, age: AGE_INPUT }, localNODE_ENV))
                        reject([])
                    })
                    saveUserPROMISE.then(async(userdata:any) => {                         
                        console.log('userdata signup in the login')
                        let clonedobject = { clone: {...userdata} }
                        console.log('clonedobject')
                        console.log(clonedobject)
                        TOGGLE_USER_ICON_CONFIRM()
                        localStorage.setItem("user", JSON.stringify(clonedobject))                        
                        // UPDATE TO        G       O       O       G       L       E               !!!!!!!!!!!!!!!!!!!
                        TOGGLE_NO_LINK_GOOGLE_BTN_CLICK()
                        setTimeout( () => {
                            lazyJQanimate($('#link-google'), 'link-google', 'reject')     
                            lazyJQanimate($('#googleconfirmation'), 'googleconfirmation', 'reject')                            
                            lazyJQanimate('#googlereject', 'googlereject', 'reject')      
                    })
                    })
                })                
            // TOGGLE_LOGIN_SIGNUP_BTN()
            TOGGLE_ICON_NOT_INPUT()
            }
            const onLinkSuccess = async (res:any) => {
                // this is the 
                let RegexMenu = await RegexBank()
                let noWhiteSpaceRegex = RegexMenu.noWhiteSpace                                        
                let googleProfile:any = res.profileObj                
                let googleImgUrl:string = googleProfile.imageUrl
                let googleId:string = googleProfile.googleId
                let timer:any        
                // ironic lighthearted name deathCertificate() that takes data as params and asserts an expiration date onto that data.
                deathCertificate('googleImgUrl', googleImgUrl, 1, false)
                // redux state that takes that imageURL retrieved from google account correspondent to the user authorizing the release of their google credentials to this app facilitated by Oauth2.0
                SET_GOOGLE_IMG_URL({ payload: googleImgUrl })
                ONLINK_GOOGLE_CONFIRM_DATA.icon = googleImgUrl

                let userUpdatedWithGoogle = await linkUserWithGoogle(USERNAME_INPUT, googleId, googleImgUrl)      
                const u = userUpdatedWithGoogle.data.linkUserWithGoogle
// simple callback for JSON.stringify(DATA) return data.json(). "wateruser" is the key that app.tsx will grab the signed up / logged in user so localStorage allows to persist through navigation from signup to home
                let googleSignupUserStrForLocStorage = await stringifyItemSetItem(ONLINK_GOOGLE_CONFIRM_DATA, "wateruser");
                const uGID = u.googleId
                // test evaluates the existence of no whitespace and proceeds on to submitting the user to localStorage before navigating back to home (indicating successful signup) with window.location.href
                if (noWhiteSpaceRegex.test(uGID)) {
                    console.log('hey were in here guys')
                    SET_LOG_IN_OUT_FLASH_MSG( { payload: uGID })
                    setTimeout( () => {
                    SET_LOG_IN_OUT_FLASH_MSG( { payload: '' })
                    }, 6000)
                }                                         
                let userStringObject = `GID:${u.googleId},icon:${u.icon},username:${u.username},password:${u.password},age:${u.age},id:${u.id}`
                await localStorage.setItem("user", userStringObject)                
                timer = await setTimeout(async() => {
                        window.location.href = "/"
                }, 1000)
            }        

            const linkGoogleConfirm = async () => {         
                //  Promise to handle URL which retrieves [ REACT_APP_DATABASE_URL, REACT_APP_API, REACT_APP_NODE_ENV, REACT_APP_GOOGLE_ID ] googleId to use their API not individual userID.
                const urlPROMISE = new Promise((resolve, reject) => {
                    let localURL = allDBurl()
                    resolve(localURL)
                    reject([])
                })                
                urlPROMISE.then( (urldata:any) => {
                    // URL returns good now to save user.
                    let localNODE_ENV = urldata.ENVdata .data.ENV.NODE_ENV                    
                    const saveUserPROMISE = new Promise( (resolve, reject) => {                        
                        // redux state sent as params so these endpoints (USERNAME_INPUT, EMAIL, AGE etc) can be iterated through, whiteSpaceRemove-Regex, and send clean user data to GraphQL for submission to Postgres.
                        resolve(userSignup({ googleId: '', icon: '', username: USERNAME_INPUT, email: EMAIL_INPUT, password: PASSWORD_INPUT, age: AGE_INPUT }, localNODE_ENV))
                        reject([])
                    })
                    saveUserPROMISE.then(async (userSignup: any) => {   
//  reaching this .then block means the user data-submission was successful. ( it could also mean reject([]) brought us here but data should've gone through it's been verified twice now )
                        const toggle_link_Promise = new Promise(async (resolve: any, reject: any) => {
                          let u = userSignup;
                          let newU = {};
                        //   delete the salted-password to avoid 400 requests from retrieving endpoints not sent with object.
                          await delete u.data.userSignup.password;                          

                        //  src/redux/reducers ----->      ONLINK_GOOGLE_CONFIRM_DATA:    { u: { age: 0, email: '', googleId: '', icon: '', id: 0, username: '' } },                (standard user object)
                          await SET_ONLINK_GOOGLE_CONFIRM_DATA({ payload: u });                      
                            //  user ? resolve with the redux state that receives {u} sent from above line of code. If not send "reject" string.
                            let confirmtoken = ONLINK_GOOGLE_CONFIRM_DATA ? ONLINK_GOOGLE_CONFIRM_DATA : 'reject';
                            resolve(confirmtoken);
                        }).then((noPWuser: any) => {
                            // in case it means reject just return so TOGGLE_YES_LINK_GOOGLE_BTN_CLICK and setStorage dont invoke. 
                            if (noPWuser === 'reject') return
    //  TOGGLE_BTN_CLICK() initiates because the <GoogleLogin> invokes upon render. This may be a cookies related issue though, while it's happened, it waits for state to be sent to storage. That function checks for google token
                            TOGGLE_YES_LINK_GOOGLE_BTN_CLICK()                            
                          localStorage.setItem('GTOKEN', 'GOOGLE');
                        });                                      
                        // UPDATE TO        G       O       O       G       L       E               !!!!!!!!!!!!!!!!!!!
                        // setTimeout( () => {
                        //     lazyJQanimate($('#link-google'), 'link-google', 'signup')     
                        //     lazyJQanimate($('#googleconfirmation'), 'googleconfirmation', 'signup')                            
                        //     lazyJQanimate('#googlereject', 'googlereject', 'signup')      
                        // })
                        // setTimeout( () => {
                            // window.location.href = "/"
                        // }, 2000)
                    })
                })
            }
            const showPassIconClick = () => { TOGGLE_PASSWORD_SHOW_CLICK() }
            return (
                <div className="login-container">                                                                    
                        <img onClick={showHideLoginSignupBtn} style={{ cursor: 'pointer', border: 'none', display: SUBMIT_INPUT_DATA ? "none" : "" }} src="/water_img/hand.png"/>                
                {/* // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com', */}            
    <img onClick={submitFaucetClick} style={{ transform: 'scale(0.50)', display: SUBMIT_INPUT_DATA ? "none" : "" }} className="submit-faucet" src={"/water_img/faucet.png"}/>                    
                {
                    SUBMIT_INPUT_DATA === false
                        ?
                <div style={{ 
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                    height: '20em', width: '15em'         
                }}>                   
                    {
                        LOGIN_SIGNUP_BTN 
                        ?                        
                        <>                            
                            <button onClick={showform} id="login" className="Login-Signup-Btn"><span id="invisible">s</span>login<span id="invisible">s</span></button>
                            <button onClick={showform} id="signup" className="Login-Signup-Btn">signup</button>                            
                        </>
                        :
                        <pre></pre>   
                    }
                    {
                        DISPLAY_FORM === "signup"
                        ?
                        <form className="Signup-Login-Form" id="Signup-Form" onMouseEnter={formhover}>                         
                        <SignupInput inputType={'username'}/>
                        <SignupInput inputType={'email'}/>
                        <SignupInput inputType={'age'}/>
                        <SignupInput inputType={'password'}/>                        
                        {
                            INPUT_FOCUS === 'password' 
                                    ?
                                    <img
                                    onClick={showPassIconClick}
                                    style={{ border: 'none', opacity: PASSWORD_SHOW_CLICK ? "1.0" : PASSWORD_SHOW ? "0.5" : "0.1", height: '25px', width: '25px', alignSelf: 'center', marginTop: '0.25em' }}
                                    src="/water_img/statistics.png"
                                    />
                                    :
                                <div></div>
                        }

                        { INPUT_FOCUS ? <ConnectedSignupLoginChecker loginstate={INPUT_FOCUS} /> : <pre> </pre> }                                                
                        </form>
                        // </div>
                        :
                        <pre></pre>
                    }
                    {
                        DISPLAY_FORM === "login"
                        ?                        
                        <form className="Signup-Login-Form" id="Login-Form" onMouseEnter={formhover}>       
                        {
                            INCORRECT_LOGIN_ATTEMPT > 0
                                    ? 
                           <ConnectedCaptcha/>
                                    : 
                            <>
                        <ConnectedLoginInput inputType={'emailOrUsername'}/>                      
                        <ConnectedLoginInput inputType={'password'}/>
                            </>
                        }                     
                        <pre id="login-msg-text"> {LOGIN_MSG} </pre>
                            {/* <pre> forgot password? possible empty cup lol </pre> */}
                        </form>
                        :
                        <pre></pre>
                    }
                </div>
                :
                <pre></pre>
                }

                {
                    SUBMIT_INPUT_DATA                     
                    ?
                    <div id="" className="column">
                        {/* <img src={ GOOGLE_IMG_URL.length > 3 ? GOOGLE_IMG_URL : "/water_img/panda.png"} /> */}
                        {/* <button onClick={remove} style={{ margin: '1em'}}> </button> */}
                <div className="row">
<h1 style={{ wordSpacing: LINK_GOOGLE_BTN_CLICK ? '1.175em' : 'normal' }}>
     <span id="bluespan"> {LINK_GOOGLE_BTN_CLICK ? 'Well, Come!' : 'Welcome!'} </span> {LINK_GOOGLE_BTN_CLICK ? '' : 'Would'} {LINK_GOOGLE_BTN_CLICK ? "Y" : 'y' }ou {LINK_GOOGLE_BTN_CLICK ? "L" : 'l' }ike {LINK_GOOGLE_BTN_CLICK ? "" : 'to link with'} <span id="gspan">G</span><span id="red_o_span">o</span><span id="yellow_o_span">o</span><span id="lil_g_span">g</span><span id="l_span">l</span><span id="e_span">e</span>:
</h1>

    <div id="link-google" className="google-container" style = {{ backgroundImage: `url('${blueGoogle}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '200px', width: '200px', border: '5px solid #dedede73', zIndex: '2',transform: 'scale(0.25)' }}> 

                {
                    LINK_GOOGLE_BTN_CLICK 
                         ?
                    <GoogleLogin            // developers.google.com -> guides -> handle-errors
                    className="Google-Button"
                    // test API string I know we shouldn't post keys this wont be the production key 
                    clientId={'569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'}
// on success runs upon render, hence the ternary function checking for redux state that restricts its rendering until certain values populate that the onSuccess function needs. This needs to be separate from googlelogin.
                    onSuccess={onLinkSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                    buttonText=""                    
                    >
                    </GoogleLogin> 
                         :
                    <div> </div>
                }
                
                <p style={{ color: "silver", fontSize: '22px'}}> ? </p>
                </div>
                </div>
                <div id="google-link-btn" className={googleLinkBtnClass}>
                
                <div className="column">
                <img id="googlereject" onClick={linkGoogleReject} className="close-confirm-btn" onMouseEnter={noLinkGoogleHoverToggleDrop} onMouseLeave={noLinkGoogleHoverToggleDrop} src="/water_img/close.png"/>

                <div                  
                 id="NoLinkGoogleBtn" className="row">
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ }}> just </pre>
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ display: NO_LINK_GOOGLE_BTN_HOVER ? "none" : ""}}> Drop </pre>
                <img  style={{ display: NO_LINK_GOOGLE_BTN_HOVER ? "" : "none", border: 'none', transform: 'scale(0.5)' }} src="/water_img/mouse_droplet.png"/>
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ }}> me </pre>
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{  }}> into </pre>
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{  }}> the </pre>
                <pre id={ NO_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{  }}> app </pre>
                </div>

                </div>

                <div className="column">
                <img id="googleconfirmation" onClick={linkGoogleConfirm} onMouseEnter={yesLinkGoogleHoverToggleDrop} onMouseLeave={yesLinkGoogleHoverToggleDrop} src="/water_img/confirmation.png"/>
                <div className="row">
                <pre id={ YES_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ color: YES_LINK_GOOGLE_BTN_HOVER ? "silver" : "" }}> sign </pre>
                <pre id={ YES_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ color: YES_LINK_GOOGLE_BTN_HOVER ? "silver" : "" }}> up </pre>
                <pre id={ YES_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ display: YES_LINK_GOOGLE_BTN_HOVER ? "none" : "" }}> and </pre>
                <pre id={ YES_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ display: YES_LINK_GOOGLE_BTN_HOVER ? "none" : "" }}> link </pre>

                <pre id={ YES_LINK_GOOGLE_BTN_HOVER ? "poppinsFat" : "hide"} style={{ letterSpacing: '0.0125em'}}>
                <span style={{ textTransform: YES_LINK_GOOGLE_BTN_HOVER ? "uppercase" : "lowercase" }} id={YES_LINK_GOOGLE_BTN_HOVER ? "gspan" : ""}> g </span>
                <span id={YES_LINK_GOOGLE_BTN_HOVER ? "red_o_span" : "hide"}> o </span>
                <span id={YES_LINK_GOOGLE_BTN_HOVER ? "yellow_o_span" : "hide"}> o </span>
                <span id={YES_LINK_GOOGLE_BTN_HOVER ? "lil_g_span" : "hide"}> g </span>
                <span id={YES_LINK_GOOGLE_BTN_HOVER ? "google_l" : "hide"}> l </span>
                <span id={YES_LINK_GOOGLE_BTN_HOVER ? "e_span" : "hide"}> e </span>
                </pre>                
                {/* <pre> just Drop me into the App</pre> */}
                </div>
                </div>

                </div>
                </div>
                    // row that includes the google button.
                    :
                    <div> </div>
                }
                {
                    SUBMIT_INPUT_DATA && !GOOGLE_LINK_ACCT_SCREEN
                    ?
                    <div></div>
                :
<div className="google-container" style = {{ backgroundImage: `url('${blueGoogle}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '50px', width: '50px', border: '5px solid #dedede73', zIndex: '2',transform: 'scale(0.25)' }}>
                    {/* <h1> blue text </h1> */}

                {/* <GoogleLogin
                className="Google-Button"
                clientId={'569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                buttonText=""
                >
                </GoogleLogin> */}            
                </div>
                }


                </div>

        )    
}

const mapStateToProps = (state:any) => ({
    LOGIN_SIGNUP_BTN: state.LOGIN_SIGNUP_BTN,
    LOG_IN_OUT_FLASH_MSG: state.LOG_IN_OUT_FLASH_MSG,
    DISPLAY_FORM: state.DISPLAY_FORM,
    USERNAME_INPUT: state.USERNAME_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    PASSWORD_SHOW: state.PASSWORD_SHOW,
    PASSWORD_SHOW_CLICK: state.PASSWORD_SHOW_CLICK,
    AGE_INPUT: state.AGE_INPUT,
    PARENT_CONFIRM: state.PARENT_CONFIRM,
    INPUT_FOCUS: state.INPUT_FOCUS,
    ALL_USERS: state.ALL_USERS,
    ALL_USERNAMES: state.ALL_USERNAMES,
    ALL_EMAILS: state.ALL_EMAILS,
    SUBMIT_INPUT_DATA: state.SUBMIT_INPUT_DATA,
    GOOGLE_LINK_ACCT_SCREEN: state.GOOGLE_LINK_ACCT_SCREEN,
    CURRENT_USER: state.CURRENT_USER,
    NO_LINK_GOOGLE_BTN_HOVER: state.NO_LINK_GOOGLE_BTN_HOVER,
    YES_LINK_GOOGLE_BTN_HOVER: state.YES_LINK_GOOGLE_BTN_HOVER,
    LINK_GOOGLE_BTN_CLICK: state.LINK_GOOGLE_BTN_CLICK,
    NO_LINK_GOOGLE_BTN_CLICK: state.NO_LINK_GOOGLE_CLICK,
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    ONLINK_GOOGLE_CONFIRM_DATA: state.ONLINK_GOOGLE_CONFIRM_DATA,
    EMAIL_OR_USERNAME_LOGIN_INPUT: state.EMAIL_OR_USERNAME_LOGIN_INPUT,
    PASSWORD_LOGIN_INPUT: state.PASSWORD_LOGIN_INPUT,
    NODE_ENV: state.NODE_ENV,
    API: state.API,
    LOGIN_MSG: state.LOGIN_MSG,
    INCORRECT_LOGIN_ATTEMPT: state.INCORRECT_LOGIN_ATTEMPT    
    // EMAIL_OR_USERNAME_LOGIN_INPUT: state.EMAIL_OR_USERNAME_LOGIN_INPUT,
    // PASSWORD_LOGIN_INPUT: state.PASSWORD_LOGIN_INPUT,
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_LOGIN_SIGNUP_BTN: () => dispatch(TOGGLE_LOGIN_SIGNUP_BTN()),
    SET_LOG_IN_OUT_FLASH_MSG: (action:any) => dispatch(SET_LOG_IN_OUT_FLASH_MSG(action)),
    TOGGLE_SHOW_FORM: (action:any) => dispatch(TOGGLE_SHOW_FORM(action)),
    
    TOGGLE_PASSWORD_SHOW: () => dispatch(TOGGLE_PASSWORD_SHOW()),
    TOGGLE_PASSWORD_SHOW_CLICK: () => dispatch(TOGGLE_PASSWORD_SHOW_CLICK()),
    SET_ALL_USERS: (action:any) => dispatch(SET_ALL_USERS(action)),
    SET_ALL_USERNAMES: (action:any) => dispatch(SET_ALL_USERNAMES(action)),
    SET_ALL_EMAILS: (action:any) => dispatch(SET_ALL_EMAILS(action)),
    TOGGLE_SUBMIT_INPUT_DATA: () => dispatch(TOGGLE_SUBMIT_INPUT_DATA()),
    TOGGLE_GOOGLE_LINK_ACCT_SCREEN: () => dispatch(TOGGLE_GOOGLE_LINK_ACCT_SCREEN()),
    SET_CURRENT_USER: (action:any) => dispatch(SET_CURRENT_USER(action)),
    TOGGLE_NO_LINK_GOOGLE_BTN_HOVER: () => dispatch(TOGGLE_NO_LINK_GOOGLE_BTN_HOVER()),
    TOGGLE_YES_LINK_GOOGLE_BTN_HOVER: () => dispatch(TOGGLE_YES_LINK_GOOGLE_BTN_HOVER()),
    TOGGLE_YES_LINK_GOOGLE_BTN_CLICK: () => dispatch(TOGGLE_YES_LINK_GOOGLE_BTN_CLICK()),
    TOGGLE_NO_LINK_GOOGLE_BTN_CLICK: () => dispatch(TOGGLE_NO_LINK_GOOGLE_BTN_CLICK()),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action)),
    TOGGLE_ICON_NOT_INPUT: () => dispatch(TOGGLE_ICON_NOT_INPUT()),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    SET_ONLINK_GOOGLE_CONFIRM_DATA: (action:any) => dispatch(SET_ONLINK_GOOGLE_CONFIRM_DATA(action)),
    SET_EMAIL_OR_USERNAME_LOGIN_INPUT: (action:any) => dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT(action)),
    SET_PASSWORD_LOGIN_INPUT: (action:any) => dispatch(SET_PASSWORD_LOGIN_INPUT(action)),    
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
    SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
    SET_EMAIL_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action)),
    SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action)),
    SET_NODE_ENV: (action:any) => dispatch(SET_NODE_ENV(action)),
    SET_API: (action:any) => dispatch(SET_API(action)),
    SET_LOGIN_MSG: (action:any) => dispatch(SET_LOGIN_MSG(action)),
    INCREMENT_INCORRECT_LOGIN_ATTEMPT: () => dispatch(INCREMENT_INCORRECT_LOGIN_ATTEMPT()),
    RESET_INCORRECT_LOGIN_ATTEMPT: () => dispatch(RESET_INCORRECT_LOGIN_ATTEMPT()),
    // TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
})

const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

// const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

export default ConnectedLoginOutGoogle;     // <Route path={'/loginoutgoogle'} element={ <ConnectedLogInOutGoogle/> } /> route looks like this! not <LogInOutGoogle>