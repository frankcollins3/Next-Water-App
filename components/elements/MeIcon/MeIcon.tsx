import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect, useContext} from 'react'
import $ from 'jquery'
import "./meicon.css"

// utility functions
import CSS from '../../../utility/CSS'
import MathRandom from '../../../utility/MathRandom'
import attributeJQ from '../../../utility/attributeJQ'
import deathCertificate from '../../../utility/deathCertificate'
import {AgeArray} from '../../../utility/UtilityValues'
import addIconToLocalStorageUser from '../../../utility/addIconToLocalStorageUser'
import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'

import ConnectedSignupLoginChecker from '../SignupLoginChecker'
import ReusableImage from '../../../components/elements/ReusableImage'

import allDBurl from '../../../utility/fetch/allDBurl'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE, TOGGLE_USER_ICON_CONFIRM, SET_LAST_ICON_SELECTION_TEXT, SET_SAVE_FOR_WEEKS_INPUT_VALUE, SET_NODE_ENV, SET_API, SET_PUPPETEER_SEARCH_TERM, TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_ICON_NOT_INPUT, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_SHOW_FORM} from '../../../redux/actions'

 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup, cup, drink, bottle, bottles, mouseWaterCup, fullCup, confirmation, close, clock, TestUser } = useImage()

    const { RhasNums, RnoBackslash, MprePng, APIsplit } = useRegex()

    let img;
    let empty:string[]|undefined[] = ['empty']
    const emptyfunc = () => { return }

    const {
      FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING, SPIN_BOTTLE_SHOW_INPUT, GOOGLE_IMG_URL, NON_GOOGLE_IMG_URL, SELECT_ICON_SCREEN, PRE_SELECTED_ICON_SRC, PSI_HOVER, GLASS_SCREEN_B4_NAV, GLASS_HALF_FULL_DB_CHOICE, LAST_ICON_SELECTION_TEXT, SAVE_FOR_WEEKS_INPUT_VALUE, NODE_ENV, API, PUPPETEER_SEARCH_TERM,
      SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE, TOGGLE_USER_ICON_CONFIRM, SET_LAST_ICON_SELECTION_TEXT, SET_SAVE_FOR_WEEKS_INPUT_VALUE, SET_PUPPETEER_SEARCH_TERM, TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_ICON_NOT_INPUT, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_SHOW_FORM
    } = props

   const [bathingSuit, setBathingSuit] = useState<boolean>(false)
   const [moveBoat, setMoveBoat] = useState(false)
   const [flipCoin, setFlipCoin] = useState(false)
   const [saveDropHover, setSaveDropHover] = useState(false)
   // const [psiHover, setPsiHover] = useState(false)

   let googleUrl:string = props.GOOGLE_IMAGE_URL

   const Leftie = ["Left-Cont", "Cont"].join(" ")
   const Rightie = ["Right-Cont", "Cont"].join(" ")
   const PSI = $('#Pre-Selected-Icon')
   const Rejection = $('#PreSelectRejection')
   let URL:any;
  //  let API:string = ''
  //  let NODE_ENV: string = ''
   let env:any;

    useEffect( () => {
      (async() => {
        let url = await allDBurl()
        env = url.ENVdata.data.ENV
        let pre_API = env.API.split(APIsplit)
        console.log('pre_API')
        console.log(pre_API)
        NODE_ENV === "development" ? SET_API({payload: pre_API[0]}) : SET_API({payload: pre_API[1]})
        SET_NODE_ENV( { payload: env.NODE_ENV})
        console.log('NODE_ENV')
        console.log(NODE_ENV)        
      })()
      
    }, [])
    

        const moveboat = () =>  {
          let numbers = [1,2,3,4,5,6,7,8,9,10]
          let randomNumber = Math.floor(Math.random() * numbers.length)
          if (randomNumber >= 5) { setFlipCoin(!flipCoin) }
          setMoveBoat(true) 
        }

        const FakeClick = (event: any) => { 
          
          let key: string = event.key;          
          let value: string = event.target.value;

          if (key === ' ') {
            console.log('youre spacin out!')
            $('#PuppeteerSearch')
            .val('')
            attributeJQ('#PuppeteerSearch', 'value', '')         
          }
                         
          if (key === 'Enter') {            
            TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
            let value:string = `lightblue${event.target.value}`                        
            const loadingicons:string[] = [cup, drink, bottle, bottles, mouseWaterCup]
                const randomIcon = MathRandom(loadingicons)
                const PuppetPromise = new Promise( (resolve, reject) => {
                  let terms:string[] = ["blue-ocean", "blue-water", "blue-river", "blue-seacreature", "blue-fish", "blue-octopus", "blue-shark", ]
                  let randomTerm = MathRandom(terms)
                    TOGGLE_SPIN_BOTTLE_SEARCHING()                    
                    SET_PUPPETEER_SEARCH_TERM( { payload: value } )
  // Promise resolve sends the return data from  GraphQL Endpoint searchTerm and prefix the user string with "light-blue" for damage control on the image having colors that don't match the blue. 
                    resolve(fetch(`${API}fill_cont?query={puppeteer(searchTerm:"light-blue-${value}")}`))    
                    // resolve(fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"light-blue-${value}")}`))    
                    // 
                    reject(SET_SPIN_BOTTLE_IMG( { payload: randomIcon || '/water_img/squid.png' }))  
                })
                PuppetPromise.then(async (data:any) => {
                    if (data) {
                      data = await data.json()
                      console.log('data')
                      console.log(data)
                      let imgSrc:string = data.data.puppeteer
                      console.log('imgSrc')
                      console.log(imgSrc)
                      SET_NON_GOOGLE_IMG_URL({ payload: imgSrc })                      
                      await SET_SPIN_BOTTLE_IMG( { payload: imgSrc })
                      await TOGGLE_SPIN_BOTTLE_SEARCHING()
                      await TOGGLE_SELECT_ICON_SCREEN()
                    } else {
                      TOGGLE_SPIN_BOTTLE_SEARCHING()
                      SET_SPIN_BOTTLE_IMG( { payload: "/water_img/bite.png"})
                    }
                })
          }
        }

        const FakeFocus = (event:any) => {
          let myElement = document.getElementById(event.target.id)
          myElement !== null ? myElement.focus() : console.log(myElement)        
        }
        const iFocus = (event:any) => {
          event.target.style.border = "1px dashed #73defe";
        }

        const dontMoveBoat = () =>  setMoveBoat(false) 

        const HoverClose = () => {
          CSS($('#Pre-Selected-Icon'), 'opacity', '0.1')
          CSS($('#PreSelectConfirmation'), 'opacity', '0.1')
        }
        
        const UnHoverClose = () => {
          CSS($('#Pre-Selected-Icon'), 'opacity', '1.0')
          CSS($('#PreSelectConfirmation'), 'opacity', '1.0')
        }
        
        const FakeBoop = () => {     
          TOGGLE_PSI_HOVER()
        }        
        
        const StopBoop = () => { 
          TOGGLE_PSI_HOVER()
          CSS($('#PreSelectRejection'), 'opacity', '1.0')          
        }

        const clickElem = (event:any) => { 
          let src:string = event.target.src    
          let length:number = src.length
          let hrefCheck:string = src.slice(0, 4);
          let imgCheck:string = src.slice(length - 3, length)    
          if (hrefCheck === 'http' && imgCheck === 'png' || imgCheck === 'jpeg') {
            SET_NON_GOOGLE_IMG_URL({ payload: event.target.src }) 
            TOGGLE_SELECT_ICON_SCREEN()
            if (SPIN_BOTTLE_SHOW_INPUT) TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
            $(event.target)
            .css('border', '5px solid #73edefe')
            .animate({
              top: '100px'
            }, 500)       
          }
          return
        }
    
        const SelectIcon = () => {           
            TOGGLE_SPIN_BOTTLE_SEARCHING()
            TOGGLE_GLASS_SCREEN_B4_NAV()
        }

        const rejectSelect = () => {
           TOGGLE_SELECT_ICON_SCREEN()
           SET_PUPPETEER_SEARCH_TERM({payload: ''})
        }

        const SaveUserHalf = async (event:any) => {     
          SET_LAST_ICON_SELECTION_TEXT( {payload: "Save icon for how many Weeks?"})
             addIconToLocalStorageUser(NON_GOOGLE_IMG_URL)             
            .then( (wateruser:any) => {                
              TOGGLE_USER_ICON_CONFIRM()            
            }).catch( (err:any) => {
              console.log('err from .catch!')
            })                   
            $('.cups').detach()
            attributeJQ($('.clock'), 'src', boat)
            attributeJQ($('#boat'), 'src', clock)
            $('#boat').removeClass('Move-Boat');          
        }
                
        const saveForWeeksOnChange = async (event:any) => {        
          let currentUser:any = await localStorage.getItem('wateruser')
          let userJSON = await JSON.parse(currentUser)
          let preuser = JSON.parse(userJSON.value)
          let user = preuser.clone.data.userSignup
          let username = user.username
                  
          
          let value:string = event.target.value
          let key:string = event.key                    
          let oneThruNine = [1,2,3,4,5,6,7,8,9]
          // let oneThruNine = AgeArray.pop()   // from src/utility/UtilityValues 
          // if the user rejects saving their icon to the database they have to choose how long the localStorage data will expire. If they choose more than 1 month / 4 weeks default down to 4 weeks.
          if (oneThruNine.includes(parseInt(key))) {
              parseInt(key) >= 4 ? SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: 4 }) : SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: key })
            } else {
              SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: ' ' })
          }                  
          if (key === 'Enter') {            
            if (PUPPETEER_SEARCH_TERM.length > 1) {
              // this separates the puppeteer search term from regular selection of icons from the /<MeIcon/> page.
              SET_LAST_ICON_SELECTION_TEXT({ payload: `${PUPPETEER_SEARCH_TERM} will dry out in ${parseInt(value) > 1 ? value : 1 } ${parseInt(value) > 1 ? 'weeks' : 'week'} ${username}`})
            } else {
              let pre_img = NON_GOOGLE_IMG_URL.substring(NON_GOOGLE_IMG_URL.lastIndexOf('/'))
              let almost_img = pre_img.match(MprePng)
              let img = almost_img[1].replace(RnoBackslash, "")
              const dodgeJumpyTimeoutPromise = new Promise( (resolve:any, reject:any) => {
                SET_LAST_ICON_SELECTION_TEXT({ payload: `${img} will dry out in ${parseInt(value) > 1 ? value : 1 } ${parseInt(value) > 1 ? 'weeks' : 'week'} ${username}`})
                let timer:any;
                resolve(timer)
                reject(empty)
              })
              dodgeJumpyTimeoutPromise
              .then( (timer:any) => {
                  timer = setTimeout( () => {
                    window.location.href = "/"
                  }, 2000)
              })
            }                      
          } 
        }
                          
        const SaveUserFull = () => {            
            const saveUserPromise = new Promise( (resolve:any, reject:any) => {
              let preUser = localStorage.getItem("user");      
              console.log('preUser SaveUserFull')        
              console.log(preUser)        

              // let password = encodeURIComponent(PASSWORD_LOGIN_INPUT.replace(/\s/g, ''));      
              if (preUser !== null) {
                let userObj = JSON.parse(preUser);          
                let userSignup = userObj.clone.data.userSignup
                let userId = userSignup.id
                let storageUserIcon:string = userSignup.icon 
                // let storageUserIcon:string = userObj.clone.data.userSignup.icon 
                storageUserIcon = NON_GOOGLE_IMG_URL.trim().replace(/\s/g, '') // userObj.clone.data.userSignup.icon
                console.log('storageUserIcon from MeIcon')
                console.log(storageUserIcon)
                resolve(fetch(`${API}fill_cont?query={NonGoogleIconUpdate(id:${parseInt(userId)},icon:"${storageUserIcon}"){id,icon}}`))
                // resolve(fetch(`${API}fill_cont?query={NonGoogleIconUpdate(id:${parseInt(userId)},icon:"${encodeURIComponent(NON_GOOGLE_IMG_URL).replace(/\s/g, '')}"){id,icon}}`))
                // resolve(fetch(`http://localhost:5000/fill_cont?query={NonGoogleIconUpdate(id:3,icon:"${NON_GOOGLE_IMG_URL}"){id,icon}}`))
                reject(empty)
              }
            })
            saveUserPromise
            .then( (updatedUser:any) => {              
              console.log("were definitely in here")
              SET_LAST_ICON_SELECTION_TEXT({payload: "Icon Saved. Taking you Home."})              
              addIconToLocalStorageUser(NON_GOOGLE_IMG_URL)                       
              TOGGLE_ICON_NOT_INPUT()
              TOGGLE_SUBMIT_INPUT_DATA()
              TOGGLE_USER_ICON_CONFIRM()
              TOGGLE_SHOW_FORM({payload: ''})
              TOGGLE_SHOW_FORM({payload: 'login'})
              // TOGGLE_LOGIN_SIGNUP_BTN()
              // setTimeout( () => {
                // window.location.href = "/"
              // }, 1000)
            }).catch( (err) => {
              
            })
        }

        const clickboat = () => {                      
          console.log('NODE_ENV')
          console.log(NODE_ENV)

          console.log('API')
          console.log(API)

        }

    const renderMeIcon = () => {
        return (
            <>
<div style={{ backgroundImage: `url('${puppetCup}')` }} className={Leftie} onMouseEnter={moveboat} onMouseLeave={dontMoveBoat}>

                    {
                          SPIN_BOTTLE_SHOW_INPUT 
                          ?
                    <img onClick={clickboat} className={ SPIN_BOTTLE_SEARCHING ? "Move-Boat" : '' } id="boat" style={{ position: 'relative', height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>
                          :
                          <div className="column">

                          <input id="PuppeteerSearch" onFocus={iFocus} onKeyDown={FakeClick} onMouseEnter={FakeFocus} style={{ color: 'blanchedalmond' }} type="text"/>
                          </div>                          
                    }

              </div>  

              <div id={SELECT_ICON_SCREEN ? "column" : ""} className={Rightie}>      
                                                            
                      {
                        SELECT_ICON_SCREEN 
                              ?                              
                              <>             
                                   {
                                GLASS_SCREEN_B4_NAV 
                                        ?
                                        <div className="SaveAllColumn">
                                          <h3 id="SavePre"> {LAST_ICON_SELECTION_TEXT ? LAST_ICON_SELECTION_TEXT : 'Save Icon? You can Edit in Settings'} </h3>
                                          <input value={SAVE_FOR_WEEKS_INPUT_VALUE || ''} style={{ display: LAST_ICON_SELECTION_TEXT === 'Save icon for how many Weeks?' ? '' : 'none', width: '30px', color: 'silver', fontWeight: 'bolder'}} onKeyDown={saveForWeeksOnChange} onChange={emptyfunc} type="text"/>
                                          {/* <input value={SAVE_FOR_WEEKS_INPUT_VALUE || ''} style={{ display: LAST_ICON_SELECTION_TEXT.length > 1 ? '' : 'none', width: '30px', color: 'silver', fontWeight: 'bolder'}} onKeyDown={saveForWeeksOnChange} onChange={emptyfunc} type="text"/> */}
                                        <div className="space-between-row">                                        

                                          <img className="cups" onClick={SaveUserHalf} onMouseEnter={() => setSaveDropHover(true)} onMouseLeave={() => setSaveDropHover(false)} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={mouseWaterCup}/>                                                                          
                                          <img className="cups" onClick={SaveUserFull} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={fullCup}/>
                                          </div> 
                                            <img className="clock" src={clock}/>                                              
                                        </div>
                                          :                          
                                    <>                                      
                              <img className={PSI_HOVER ? "psiHoverAnimation" : ""} id="Pre-Selected-Icon" src={NON_GOOGLE_IMG_URL}/>
                                                           
                                <div className="row">
                                  <img id="PreSelectRejection" onClick={rejectSelect} onMouseEnter={HoverClose} onMouseLeave={UnHoverClose} style={{ margin: '0 1em', opacity: PSI_HOVER ? "0.1" : "1.0" }} src={close}></img>
                                  <img onClick={SelectIcon} id="PreSelectConfirmation" onMouseEnter={FakeBoop} onMouseLeave={FakeBoop} style={{ margin: '0 1em'}} src={confirmation}></img>
                                </div>
                                   </>
                                }                 
                              </>
                              :                         
                              <>                        
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                                <img style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
                                </Boop>
    
                                <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                              <img onClick={clickElem} onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
                              </Boop>  
                              
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                      
                              <img src={shark}></img>
                              </Boop>
    
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                
                                <img src={panda}></img>
                              </Boop>

                          <div className="column">
                          <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img style={{ display: SPIN_BOTTLE_SEARCHING ? "none" : ""}}  src={SPIN_BOTTLE_IMG || target}></img>
                        </Boop>  
                          <pre style={{ display: SPIN_BOTTLE_SEARCHING ? "" : "none" }}> Pouring. Please Wait.  </pre>
                            </div>  
    
                            <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img src={turtle}></img>
                        </Boop>
                              
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                       <img src={dolphin}></img>
                        </Boop> 
    
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img src={pool}></img>
                        </Boop>
                                               
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img src={bucket}></img>
                        </Boop>

                          </>
                      }
                    
 
            </div>  
                            
                        
            </>
        )
    }

    return <div className="MeIcon-Container"> {renderMeIcon()} </div>
}

const mapStateToProps = (state:any) => ({
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,
    SPIN_BOTTLE_IMG: state.SPIN_BOTTLE_IMG,
    SPIN_BOTTLE_SHOW_INPUT: state.SPIN_BOTTLE_SHOW_INPUT,
    SPIN_BOTTLE_SEARCHING: state.SPIN_BOTTLE_SEARCHING,
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL,
    NON_GOOGLE_IMG_URL: state.NON_GOOGLE_IMG_URL,
    SELECT_ICON_SCREEN: state.SELECT_ICON_SCREEN,
    PRE_SELECTED_ICON_SRC: state.PRE_SELECTED_ICON_SRC,
    PSI_HOVER: state.PSI_HOVER,
    GLASS_SCREEN_B4_NAV: state.GLASS_SCREEN_B4_NAV,
    GLASS_HALF_FULL_DB_CHOICE: state.GLASS_HALF_FULL_DB_CHOICE,
    USER_ICON_CONFIRM: state.USER_ICON_CONFIRM,
    LAST_ICON_SELECTION_TEXT: state.LAST_ICON_SELECTION_TEXT,
    SAVE_FOR_WEEKS_INPUT_VALUE: state.SAVE_FOR_WEEKS_INPUT_VALUE,
    NODE_ENV: state.NODE_ENV,
    API: state.API,
    PUPPETEER_SEARCH_TERM: state.PUPPETEER_SEARCH_TERM
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING()),
    TOGGLE_SPIN_BOTTLE_SHOW_INPUT: () => dispatch(TOGGLE_SPIN_BOTTLE_SHOW_INPUT()),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action)),
    SET_NON_GOOGLE_IMG_URL: (action:any) => dispatch(SET_NON_GOOGLE_IMG_URL(action)),    
    TOGGLE_SELECT_ICON_SCREEN: () => dispatch(TOGGLE_SELECT_ICON_SCREEN()),
    SET_PRE_SELECTED_ICON_SRC: (action:any) => dispatch(SET_PRE_SELECTED_ICON_SRC(action)),
    TOGGLE_PSI_HOVER: () => dispatch(TOGGLE_PSI_HOVER()),
    TOGGLE_GLASS_SCREEN_B4_NAV: () => dispatch(TOGGLE_GLASS_SCREEN_B4_NAV()),
    TOGGLE_GLASS_HALF_FULL_DB_CHOICE: () => dispatch(TOGGLE_GLASS_HALF_FULL_DB_CHOICE()),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    SET_LAST_ICON_SELECTION_TEXT: (action:any) => dispatch(SET_LAST_ICON_SELECTION_TEXT(action)),
    SET_SAVE_FOR_WEEKS_INPUT_VALUE: (action:any) => dispatch(SET_SAVE_FOR_WEEKS_INPUT_VALUE(action)),
    SET_NODE_ENV: (action:any) => dispatch(SET_NODE_ENV(action)),
    SET_API: (action:any) => dispatch(SET_API(action)),
    SET_PUPPETEER_SEARCH_TERM: (action:any) => dispatch(SET_PUPPETEER_SEARCH_TERM(action)),
    TOGGLE_LOGIN_SIGNUP_BTN: () => dispatch(TOGGLE_LOGIN_SIGNUP_BTN()),
    TOGGLE_ICON_NOT_INPUT: () => dispatch(TOGGLE_ICON_NOT_INPUT()),
    TOGGLE_SUBMIT_INPUT_DATA: () => dispatch(TOGGLE_SUBMIT_INPUT_DATA()),
    TOGGLE_SHOW_FORM: (action:any) => dispatch(TOGGLE_SHOW_FORM(action))
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon                                          