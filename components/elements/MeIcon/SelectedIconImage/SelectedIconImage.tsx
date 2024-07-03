import $ from 'jquery'
import {useState} from "react"
import axios from "axios"

// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./SelectedIconImage.module.scss"                 
// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_NON_GOOGLE_IMG_URL, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_SHOW_FORM, TOGGLE_IS_LOGGED_IN, SET_CURRENT_USER } from "redux/logInOutGoogle/logInOutGoogleSlice"
import { TOGGLE_SELECTED_WEB_ICONS, TOGGLE_SELECT_ICON_SCREEN } from "redux/icons/iconsSlice"
import { TOGGLE_SHOW_HYDRO_SETTINGS } from "redux/main/mainSlice"

// utils
import { useImage } from "Contexts/ImgContext"
import { SelectedIconImgStr, User} from "interfaces/interface"
import { flexPropertyColumnCombo, flexPropertyRowCombo, CSS } from 'utility/UtilityValues'
import { userSignupQueryStringFunc } from 'graphql/queries'

// WebIconBoatGrid && <

// possibly no need for redux. "NON_GOOGLE_IMG_URL" will be passed through this.
// might hide the cup while doing this!!!!!
// this is the sign up route!!!! :D :D :D :D <3 <3 <3 

export default function SelectedIconImage (props:any) {
// export default function SelectedIconImage (props:SelectedIconImgStr) {
    const dispatch = useDispatch()
    
    const [confirmState, setConfirmState] = useState(false)
    const [fadeImgChange, setFadeImgChange] = useState(false)

    const [confirmOrClose, setConfirmOrClose] = useState('')

    
    const NON_GOOGLE_IMG_URL = useSelector((state:RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)
    const USERNAME_INPUT = useSelector((state:RootState) => state.logInOutGoogle.USERNAME_INPUT)
    const EMAIL_INPUT = useSelector((state:RootState) => state.logInOutGoogle.EMAIL_INPUT)
    const AGE_INPUT = useSelector((state:RootState) => state.logInOutGoogle.AGE_INPUT)
    const PASSWORD_INPUT = useSelector((state:RootState) => state.logInOutGoogle.PASSWORD_INPUT)
    
    const SELECTED_WEB_ICONS = useSelector((state:RootState) => state.icons.SELECTED_WEB_ICONS)
    const SELECT_ICON_SCREEN = useSelector((state:RootState) => state.icons.SELECT_ICON_SCREEN)

    console.log('props', props)
    console.log('NON_GOOGLE_IMG_URL', NON_GOOGLE_IMG_URL)

    const preClassToTarget = [styles.pre, "pre"].join(" ")

    // redux state to store the selected icon to the <img src/> before saving signed up user to postgres DB with that icon the user selected.
    const { img } = props
    const { confirmation, close, like } = useImage()
    
    console.log("props", props)
    
    const closeJQ = $('#close')[0]
    const confirmationJQ = $('#confirmation')[0]
    const selectedIconJQ = $('#iconID')

    const sty:string = styles.img;

    const confirmClick = (event:any) => {         
        console.log('event', event)
        $('#close').detach()
        $('#confirmation').detach()
        $(event.target).css('opacity', '1.0')
        
// username, password, email, age, icon, google_id
        const userSignupQuery = userSignupQueryStringFunc(USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT, NON_GOOGLE_IMG_URL, "no google-id")
        console.log('signupquery', userSignupQuery)

        console.log("show me the query please");                             

        // ask user to create their settings. 
        axios
.post('/api/graphql', {
  query: `${userSignupQuery}`
}).then( (user:any) => {
    if (!user || !user?.data?.data?.userSignup) {
        return;
    }
    user = user?.data?.data?.userSignup;
    dispatch(TOGGLE_IS_LOGGED_IN())
    dispatch(TOGGLE_SHOW_HYDRO_SETTINGS())
    setConfirmState(true);
    
    setTimeout(() => {
        dispatch(SET_CURRENT_USER(user))
    }, 2000)

    document.cookie = `token=${user?.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;                            
    document.cookie = `id=${user?.id}; max-age=${7 * 24 * 60 * 60}; path=/;`
    console.log('user', user)
}).catch((error) => {
    console.log('error', error)
})
    }    
    const closeClick = (event:any) => {
        // clear profile image that user selected but didn't confirm as finalized 
        if (NON_GOOGLE_IMG_URL !== "") {
            dispatch(SET_NON_GOOGLE_IMG_URL(''))
        }
        
        console.log('event', event)
        $('#confirmation').css("opacity", "0.1")
        $(event.target).css('opacity', '1.0')

        {SELECTED_WEB_ICONS && dispatch(TOGGLE_SELECTED_WEB_ICONS())}
        {SELECT_ICON_SCREEN && dispatch(TOGGLE_SELECT_ICON_SCREEN())}        
    }

    const RENDER = () => {
        return (
            <Container id={styles.Cont}>
            <pre id={styles.invisisble1}>  </pre>
            <img id="iconID" className={styles.icon} src={fadeImgChange ? like : NON_GOOGLE_IMG_URL}/>
                        
                {
                    confirmState === false
                    ? <pre className={preClassToTarget}>  New <span className={styles.span}>Wave</span> Icon?  </pre>  
                    : 
                    <pre className={preClassToTarget}>  We <span className={styles.span}>Wave</span> Back to You <span className={styles.span}> {USERNAME_INPUT} </span>  </pre>
                }                                                 

            <Container id={styles.selectBtnCont} className={flexPropertyRowCombo}>
            <img onClick={confirmClick} id="confirmation" className={sty} src={confirmation}/>
            <img onClick={closeClick} id="close" className={sty} src={close}/>
            </Container>

            <pre id={styles.invisisble2}></pre>
            </Container>        
        )
    }
    return <> {RENDER()} </>
}

// axios
// .post('/api/graphql', {
//   query: `
//   mutation {
//     userSignup(username: "${USERNAME_INPUT}", password: "${PASSWORD_INPUT}", email: "${EMAIL_INPUT}", age: ${AGE_INPUT}, icon: "${NON_GOOGLE_IMG_URL}", google_id: "no google-id") {
//       username,
//       password,
//       email,
//       age,
//       icon,
//       google_id
//     }
//   }
//   `
// }).