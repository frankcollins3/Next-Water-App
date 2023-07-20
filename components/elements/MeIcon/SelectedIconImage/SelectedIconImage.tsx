import $ from 'jquery'
import {useState} from "react"

// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./SelectedIconImage.module.scss"

// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_NON_GOOGLE_IMG_URL } from "redux/logInOutGoogle/logInOutGoogleSlice"
import { TOGGLE_SELECTED_WEB_ICONS } from "redux/icons/iconsSlice"

// utils
import { useImage } from "Contexts/ImgContext"
import { SelectedIconImgStr } from "utility/interfaceNtypes"
import { flexPropertyColumnCombo, flexPropertyRowCombo, CSS } from 'utility/UtilityValues'

// WebIconBoatGrid && <

// possibly no need for redux. "NON_GOOGLE_IMG_URL" will be passed through this.
// might hide the cup while doing this!!!!!
// this is the sign up route!!!! :D :D :D :D <3 <3 <3 

export default function SelectedIconImage (props:any) {
// export default function SelectedIconImage (props:SelectedIconImgStr) {
    const dispatch = useDispatch()
    
    const [confirmState, setConfirmState] = useState(false)
    const [fadeImgChange, setFadeImgChange] = useState(false)
    
    const NON_GOOGLE_IMG_URL = useSelector((state:RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)

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
    

    

    // const { img } = iconImgSrc
    const sty:string = styles.img

    const confirmClick = (event:any) => {
        console.log('event', event)
        $('#close').detach()
        $('#confirmation').detach()
        $(event.target).css('opacity', '1.0')
        $('#iconID').addClass(styles.vanishImage)        
        setTimeout( () => $('.pre').fadeOut(), 1250 )
        setTimeout( () => $('.pre').fadeIn(), 2750 )
        setConfirmState(true)
        // $('pre').fadeIn()
        setTimeout( () => { setFadeImgChange(true) }, 1800)

    }
    
    const closeClick = (event:any) => {
        console.log('event', event)
        $('#confirmation').css("opacity", "0.1")
        $(event.target).css('opacity', '1.0')

        dispatch(TOGGLE_SELECTED_WEB_ICONS())
    }

    

    const RENDER = () => {
        return (
            <Container id={styles.Cont}>
            <pre id={styles.invisisble1}></pre>
            
            <img id="iconID" className={styles.icon} src={fadeImgChange ? like : NON_GOOGLE_IMG_URL}/>
                        
                {
                    confirmState === false
                    ? <pre className={preClassToTarget}>  New <span className={styles.span}>Wave</span> Icon?  </pre>  
                    : 
                    <pre className={preClassToTarget}>  We <span className={styles.span}>Wave</span> Back to You <span className={styles.span}> USER! </span>  </pre>
                }
                                                 
                
                {/* <Container className={flexPropertyRowCombo}>
                <pre className={styles.pre}> We Wave back to you User! </pre>
                <Container/>  */}
            
                        

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