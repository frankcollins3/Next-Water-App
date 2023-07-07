import React from 'react'
import "./usernameinput.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'

import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_USERNAME_INPUT, TOGGLE_INPUT_FOCUS} from '../../../redux/actions'

function UsernameInput (props:any) {
    //  function UsernameInput (props:any) {

    let { USERNAME_INPUT, SET_USERNAME_INPUT, TOGGLE_INPUT_FOCUS } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props
    
    const usernameinputhandler = (event:any) => { inputHandler(event, SET_USERNAME_INPUT) }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        if (targetId === 'password') {
            // attributeJQ(target, 'value', PASSWORD)            
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }
        // modular function arguments:                  1: target $(event.target)  2: 'value' <input value={}/>        3: targetId: ['username', 'password',]
    }
    
    const inputfocus = async () => { TOGGLE_INPUT_FOCUS( { payload: 'username'} ) }


    const renderUsernameInput = () => {
        return (
          <>
            <input
              value={USERNAME_INPUT}
              onMouseEnter={ghosttext}
              onChange={usernameinputhandler}
              onFocus={inputfocus}
              id="username"
              type="text"
            ></input>
            {/* <ConnectedSignupLoginChecker loginstate={"username"} /> */}
          </>
        );
      };

    return (<div className="UsernameInput-container">{renderUsernameInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    USERNAME_INPUT: state.USERNAME_INPUT,
    INPUT_FOCUS: state.INPUT_FOCUS,
    // ALL_USERS: state.ALL_USERS
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action))
})

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(UsernameInput)

export default ConnectedUsernameInput