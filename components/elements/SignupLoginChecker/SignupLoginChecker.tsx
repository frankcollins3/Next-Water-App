import {useState, useEffect} from 'react'
import React from 'react'
import styles from "./SignupLoginChecker.module.scss"
// import allDBurl from  "../../../utility/fetch/allDBurl"

// utility
import RegexBank from "utility/RegexBank"
import {AgeArray} from "utility/UtilityValues"
import {ALPHABET} from "utility/UtilityValues"
import {useImage} from "Contexts/ImgContext"


// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {  TOGGLE_PARENT_CONFIRM } from "redux/logInOutGoogle/logInOutGoogleSlice"

interface Props {
    loginstate: string
}

export default function SignupLoginChecker(props: Props) {
    const dispatch = useDispatch()
    // useState variable for pageWidth set by effect because next renders @ build? SDLC issue where it'll look for window before build and won't have it until build
    // const [pageWidth, setPageWidth] = useState(0)

    // redux state declarations with useSelector that import RootState from graphql/rootReducer.js <CombinedReducers> 
    const USERNAME_INPUT = useSelector((state: RootState) => state.logInOutGoogle.USERNAME_INPUT);
    const ALL_USERNAMES = useSelector((state: RootState) => state.logInOutGoogle.ALL_USERNAMES);
    const ALL_EMAILS = useSelector((state: RootState) => state.logInOutGoogle.ALL_EMAILS);
    const EMAIL_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_INPUT);
    const PASSWORD_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_INPUT);
    const AGE_INPUT = useSelector((state: RootState) => state.logInOutGoogle.AGE_INPUT);
    const PARENT_CONFIRM = useSelector((state: RootState) => state.logInOutGoogle.PARENT_CONFIRM);

    // useEffect( () => setPageWidth(window.innerWidth) )

    const { bg, mouseDroplet, panda } = useImage() 

    const { loginstate } = props

    let usernameLength:number = USERNAME_INPUT.length
    let RegexMenu:any;

    useEffect( () => {
        (async () => {
            RegexMenu = await RegexBank()
        })()      
    }, [])

    const inputCheckboxHandler = (event:any) => {        
        let checked:boolean = event.target.checked       
        dispatch(TOGGLE_PARENT_CONFIRM())
        if (checked) {
            console.log(`checked: ${checked}`)
        }        
        return
    }

    const RenderSignupLoginChecker = () => {
//  if (loginstate === 'username') this is a dynamic UI component so the loginstate prop is going to change which logic is followed. basically constraint checkers
        if (loginstate === 'username') {            
            return (
                <div className={styles.checkerContainer}>
                    <div className={styles.column}>
                    {/* <img className="Checker-Droplet" src={ALL_USERNAMES.map( (username:any, index:number) => username !== USERNAME_INPUT ) ? "/water_img/bg.png" : "water_img/mouse_droplet.png"}/> */}
                    <img className={styles.checkerDroplet} src={ALL_USERNAMES.includes(USERNAME_INPUT) ? bg : mouseDroplet }/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p className={styles.p} style={{ color: ALL_USERNAMES.includes(USERNAME_INPUT) ? "#686868" : "#73defe" }}> unique </p>
                    </div>
                    <div className={styles.column}>
                    <img className={styles.checkerDroplet} src={usernameLength > 6 && usernameLength < 30 ? mouseDroplet : bg }/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p className={styles.p} style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> length </p>
                    </div>                    
                </div>
            )
        }

        if (loginstate === 'email') {        
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className={styles.checkerContainer}>                
                    <div className={styles.column}>
                    <img className={styles.checkerDroplet} src={ EMAIL_INPUT.includes('@') ? mouseDroplet : bg }/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p className={styles.p} style={{ color: EMAIL_INPUT.includes('@') ? "#73defe" : "#686868" }}> @ </p>
                    </div>       

                    <div className={styles.column}>
                        <img className={styles.checkerDroplet} src={ ALL_EMAILS.includes(EMAIL_INPUT) ? bg : mouseDroplet}></img>
                        <p className={styles.p} style={{ color: ALL_EMAILS.includes(EMAIL_INPUT) ? "#73defe" : "#686868" }}> unique </p>
                    </div>

                    <div className={styles.column}>
<img className={styles.checkerDroplet} src={ 
    EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org"
 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p className={styles.p} style={{ color: EMAIL_INPUT.includes('.com') || EMAIL_INPUT.includes('.net') || EMAIL_INPUT.includes('.org') ? "#73defe" : "#686868" }}> { EMAIL_INPUT.includes('.') ? EMAIL_INPUT.split('.')[1].length === 3 ? `.${EMAIL_INPUT.split('.')[1]}` : ".com" : ".com" } </p>
                    </div>
                </div>
            )
        }

        if (loginstate === 'password') {                        
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className={styles.checkerContainer}>
                    <div className={styles.column}>
                    <img className={styles.checkerDroplet} src={/[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT) ? mouseDroplet : bg }/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p className={styles.p} style={{ color: /[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> special </p>
                    {/* .replace(/%20|\s|[^a-zA-Z0-9]/g, '') */}

                    {/* <p style={{ color: /[!@#$%^&*()]/.test(PASSWORD_INPUT) ? "#73defe" : "686868" }}> special </p> */}
                    </div>
                    <div className={styles.column}>
                    <img className={styles.checkerDroplet} src={ /[A-Z]/.test(PASSWORD_INPUT) ? mouseDroplet : bg } />
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p className={styles.p} style={{ color: /[A-Z]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> CAPS </p>
                    {/* <p style={{ color: PASSWORD_INPUT.replace(/[\/A-Z]/g, '')  ? "#73defe" : "#686868" }}> CAPS </p> */}
                    </div>                    
                    <div className={styles.column}>
                    <img className={styles.checkerDroplet} src={ /[0-9]/.test(PASSWORD_INPUT) ? mouseDroplet : bg }/>

                    <p className={styles.p} style={{ color: /[0-9]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> number </p>
                    {/* <p style={{ color: RegexBank.hasNums.test(parseInt(PASSWORD_INPUT)) ? "#73defe" : "#686868" }}> number </p> */}                    
                    </div>
                </div>
            )
        }
        
        if (loginstate === 'age') {       
            console.log("yeah loginstate === age") 
            let check = AgeArray.includes(parseInt(AGE_INPUT))            
            return (
                <div className={styles.checkerContainer}>      
                    <div className={styles.column}>
<img className={styles.checkerDroplet} src={ AgeArray.includes(parseInt(AGE_INPUT)) && parseInt(AGE_INPUT) > 0 && PARENT_CONFIRM === false  ? panda : AGE_INPUT.length && parseInt(AGE_INPUT) > 0 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png" }/>
<pre style={{ wordSpacing: '0.05em', color: 'silver', display: AgeArray.includes(parseInt(AGE_INPUT)) && parseInt(AGE_INPUT) >= 4 && !PARENT_CONFIRM ? "" : "none"}}
> Have Fun Droplet!
</pre>

<input onChange={inputCheckboxHandler} type="checkbox" id={styles.parentCheckbox} style={{ display: AgeArray.includes(parseInt(AGE_INPUT)) && parseInt(AGE_INPUT) >= 4 && !PARENT_CONFIRM ? "" : "none", }} />
<label style={{ display: AgeArray.includes(parseInt(AGE_INPUT)) && parseInt(AGE_INPUT) > 4 && PARENT_CONFIRM === false ? "" : "none", }} htmlFor="parent-checkbox" className="custom-checkbox"></label>
    

                    </div>                    
                </div>
            )
        }

        return (
            <p className={styles.p} style={{ fontSize: '8px', textAlign: 'center' }}> hey well thats really funny </p>
        )
    }

    return <div className="SignupLoginChecker-Container"> {RenderSignupLoginChecker()} </div>
}


{/* <div
dangerouslySetInnerHTML={{
    __html: `Droplet! Please:<br/>Tell Parent or Guardian<br/>About us!`,
}}
style={{
    textAlign: 'center',
    color: 'silver',
    display:
    AgeArray.includes(parseInt(AGE_INPUT)) &&
    parseInt(AGE_INPUT) >= 4 &&
    !PARENT_CONFIRM
        ? ''
        : 'none',
}}
></div> */}
