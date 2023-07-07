import {connect, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import React from 'react'
import "./signupinput.css"

// utility functions
import inputHandler from '../../../utility/inputHandler'
import attributeJQ from '../../../utility/attributeJQ'
// import RegexObject from '../../../utility/RegexObject'
import {useRegex} from '../../../utility/Contexts/RegexMenu'

// redux acitons
import { SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_USERNAME_INPUT_HOVER, TOGGLE_PASSWORD_INPUT_HOVER, TOGGLE_EMAIL_INPUT_HOVER, TOGGLE_AGE_INPUT_HOVER } from '../../../redux/actions'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'

interface Props {
    inputType: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    PASSWORD_SHOW: boolean,
    PASSWORD_SHOW_CLICK: boolean,
    EMAIL_INPUT: string,
    AGE_INPUT: string,
    USERNAME_INPUT_HOVER: string,
    PASSWORD_INPUT_HOVER: string,
    EMAIL_INPUT_HOVER: string,
    AGE_INPUT_HOVER: string,

    TOGGLE_INPUT_FOCUS: any
    SET_USERNAME_INPUT: any,
    SET_PASSWORD_INPUT: any,
    SET_EMAIL_INPUT: any,
    SET_AGE_INPUT: any,
    TOGGLE_PASSWORD_SHOW: any,
    TOGGLE_PASSWORD_SHOW_CLICK: any,
    TOGGLE_USERNAME_INPUT_HOVER: any,
    TOGGLE_PASSWORD_INPUT_HOVER: any,
    TOGGLE_EMAIL_INPUT_HOVER: any,
    TOGGLE_AGE_INPUT_HOVER: any
}

function SignupInput (props: Props) {

    const [passwordShowClick, setPasswordShowClick] = useState<boolean>(false)
    const [dontSet, setDontSet] = useState<boolean>(false)

    const dispatch = useDispatch()

    const  { RhasNums, MsplitAtDot, McharAfterComma, McharBeforeAt, RdotAtEscape } = useRegex()

    let RegexObject:any;    

const { inputType, USERNAME_INPUT, PASSWORD_INPUT, PASSWORD_SHOW, PASSWORD_SHOW_CLICK, EMAIL_INPUT, AGE_INPUT, SET_USERNAME_INPUT, USERNAME_INPUT_HOVER, PASSWORD_INPUT_HOVER, EMAIL_INPUT_HOVER, AGE_INPUT_HOVER,
        SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_USERNAME_INPUT_HOVER, TOGGLE_PASSWORD_INPUT_HOVER, TOGGLE_EMAIL_INPUT_HOVER, TOGGLE_AGE_INPUT_HOVER
      } = props



// value={ inputType === "username" ? USERNAME_INPUT : inputType === "email" ? EMAIL_INPUT : inputType === 'password' ? PASSWORD_INPUT: inputType === "age" ? AGE_INPUT : "text" }  <SignupInput age={age}> * * POPULATES STATE! and input value ! ! * * 
    const inputOnChange = (event:any) => {
        let value:string = event.target.value
        if (inputType === 'username') {            
            inputHandler(event, SET_USERNAME_INPUT)
        }

        if (inputType === 'email') {
            const splitHelper = event.target.value.split('@.')
            if (value[value.length-1] === '.') {
                let splitEmail:any = value.match(MsplitAtDot)                
                if (splitEmail != null) {
                    const matchedValue:string = splitEmail[0]
                    const premail:any = value.match(McharBeforeAt)
                    const emailNoAt:string = premail[0]                
    //  if the regex-affected string: (all characters between) [ ' @ ' __ '.' ]  Includes all the letters to gmail but is spelled incorrectly:      Fix string and update state. if not update state.
                    if (matchedValue?.includes('g') && matchedValue.includes('m') && matchedValue.includes('a') && matchedValue.includes('i') && matchedValue.includes('l') && matchedValue !== '@gmail.') {
                        setDontSet(true)
                        let remail:string = `${emailNoAt}gmail.com`                        
                        // setTimeout( () => SET_EMAIL_INPUT( {payload: remail } ), 500)                         
                        setTimeout( () => {
                            SET_EMAIL_INPUT( { payload: remail}, 500)
                            // setDontSet(!dontSet)
                            setDontSet(false) 
                        }, 500)                        
                    } 
                    else {
                        setDontSet(false)
                        inputHandler(event, SET_EMAIL_INPUT)
                    }
                }
            }
                        dontSet ? console.log('aaye') : inputHandler(event, SET_EMAIL_INPUT)
            }                
                
        if (inputType === 'age') {
            inputHandler(event, SET_AGE_INPUT)
        }
        if (inputType === 'password') {
            let hasNums4 = RhasNums.test(PASSWORD_INPUT)
            // let hasNums4 = RegexObject.hasNums.test(parseInt(PASSWORD_INPUT))        
            const statePromise = new Promise( (resolve, reject) => {
                resolve([ SET_PASSWORD_INPUT({payload: value}) ])
            })                 
            statePromise
            .then( () => {return})                                  
            .catch( (err) => console.log(err))
        }
    }

    const ghostText = (event:any) => attributeJQ(event.target, 'value', event.target.id)

    const inputfocus = async () => { TOGGLE_INPUT_FOCUS( { payload: inputType } ) }
        
        const RenderSignupInput = () => {
            return (
                <>
             <input
             style={{ marginTop: '1em'}}
              type={ inputType === "password" && PASSWORD_SHOW_CLICK === false ? "password" : "text"}
              spellCheck="false"
              id={inputType}
              value={ inputType === "username" ? USERNAME_INPUT : inputType === "email" ? EMAIL_INPUT : inputType === 'password' ? PASSWORD_INPUT: inputType === "age" ? AGE_INPUT : "text" }
              onChange={inputOnChange}
              onMouseEnter={ghostText}
              onFocus={inputfocus}
            />        
               </>                
            )
        }

         return <div className="SignupInput-Container"> {RenderSignupInput()} </div>

}


const mapStateToProps = (state:any) => ({
        USERNAME_INPUT: state.USERNAME_INPUT,
        PASSWORD_INPUT: state.PASSWORD_INPUT,
        EMAIL_INPUT: state.EMAIL_INPUT,
        AGE_INPUT: state.AGE_INPUT,    
        PASSWORD_SHOW: state.PASSWORD_SHOW,
        PASSWORD_SHOW_CLICK: state.PASSWORD_SHOW_CLICK,

        USERNAME_INPUT_HOVER: state.USERNAME_INPUT_HOVER,
        PASSWORD_INPUT_HOVER: state.PASSWORD_INPUT_HOVER,
        EMAIL_INPUT_HOVER: state.EMAIL_INPUT_HOVER,
        AGE_INPUT_HOVER: state.AGE_INPUT_HOVER,
})

// TEST_STATE: state.TEST_STATE   

const mapDispatchToProps = (dispatch:any) => ({
        TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action)),
        SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
        SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
        TOGGLE_PASSWORD_SHOW: () => dispatch(TOGGLE_PASSWORD_SHOW()),
        TOGGLE_PASSWORD_SHOW_CLICK: () => dispatch(TOGGLE_PASSWORD_SHOW_CLICK()),
        SET_EMAIL_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action)),
        SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action)),

        TOGGLE_USERNAME_INPUT_HOVER: () => dispatch(TOGGLE_USERNAME_INPUT_HOVER()),
        TOGGLE_PASSWORD_INPUT_HOVER: () => dispatch(TOGGLE_PASSWORD_INPUT_HOVER()),
        TOGGLE_EMAIL_INPUT_HOVER: () => dispatch(TOGGLE_EMAIL_INPUT_HOVER()),
        TOGGLE_AGE_INPUT_HOVER: () => dispatch(TOGGLE_AGE_INPUT_HOVER())
})

// cannot find name TOGGLE_TEST_STATE have to create it and link /redux/actions path up.

const ConnectedSignupInput = connect(mapStateToProps, mapDispatchToProps)(SignupInput)

export default ConnectedSignupInput