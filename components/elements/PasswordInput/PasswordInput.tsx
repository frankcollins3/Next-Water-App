import React from 'react'
import "./password.css"
import {connect, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'
import halfAssHash from '../../../utility/halfAssHash'
import duplicateString from '../../../utility/duplicateString'
import RegexBank from '../../../utility/RegexBank'

import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_INPUT_DBL_CLICK} from '../../../redux/actions'

function PasswordInput (props:any) {

    let RegexObject:any


    let { 
         TOGGLE_INPUT_FOCUS, PASSWORD_INPUT, DUMMY_PASSWORD_INPUT, INPUT_DBL_CLICK,
         SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT, TOGGLE_INPUT_DBL_CLICK
        } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props

        useEffect( () => {
            (async() => {
                RegexObject = await RegexBank()                
            })()
        })

        useEffect( () => {            
            let hasCaps = /A-Z/.test(PASSWORD_INPUT)            
        }, [PASSWORD_INPUT])
        
        const passwordinputhandler = async (evt: React.ChangeEvent<HTMLInputElement>) => {            
            let hasNums4 = RegexObject.hasNums.test(parseInt(PASSWORD_INPUT))
        

            let target = evt.target
            let value:any = target.value  // cant use string because we'll be looping over it     
            const statePromise = new Promise( (resolve, reject) => {
                resolve([ SET_PASSWORD_INPUT({payload: value}) ])
            })            
            return value ? statePromise : []               
        };

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        if (targetId === 'password') {
            // attributeJQ(target, 'value', PASSWORD)
            
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }
        // modular function arguments:                  1: target $(event.target)   2: 'value' <input value={}/>        3: targetId: ['username', 'password',]
    }
    
    const inputfocus = async () => {
         SET_PASSWORD_INPUT( { payload: ''})
         TOGGLE_INPUT_FOCUS( { payload: 'password'} ) 
        }

    const inputDblClick = (event:any) => {
        // let target = event.target
        // let targetType:string = target.type
        // if (targetType === 'password') {
        //     targetType = "text"
        // } 
        // else if (targetType === "text") {
        //     targetType = "password"
        // }
        TOGGLE_INPUT_DBL_CLICK()
        setTimeout( () => {
            console.log(TOGGLE_INPUT_DBL_CLICK)
        }, 2000)
    }
        
        

                                                                                    
    const renderPasswordInput = () => {
        return (
        <>
<input onDoubleClick={inputDblClick} id="password" type={INPUT_DBL_CLICK ? "text" : "password"} style={{ color: '#72d3fe', fontSize: '20px'}} onFocus={inputfocus} value={PASSWORD_INPUT} onMouseEnter={ghosttext} // "*".repeat(DUMMY_PASSWORD_INPUT.length)
onChange={(event) => { passwordinputhandler(event); }}/>
    </>
        )
    }

    return (<div className="UsernameInput-container">{renderPasswordInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    DUMMY_PASSWORD_INPUT: state.DUMMY_PASSWORD_INPUT,
    INPUT_FOCUS: state.INPUT_FOCUS,
    INPUT_DBL_CLICK: state.INPUT_DBL_CLICK
    // ALL_USERS: state.ALL_USERS
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
    SET_DUMMY_PASSWORD_INPUT: (action:any) => dispatch(SET_DUMMY_PASSWORD_INPUT(action)),
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action)),
    TOGGLE_INPUT_DBL_CLICK: () => dispatch(TOGGLE_INPUT_DBL_CLICK())
})

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(PasswordInput)

export default ConnectedUsernameInput
