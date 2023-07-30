import React from 'react'
import "./age.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'

import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_AGE_INPUT, TOGGLE_INPUT_FOCUS} from '../../../redux/actions'

function AgeInput (props:any) {
    //  function UsernameInput (props:any) {

    let { AGE_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props
    
    const ageinputhandler = (event:any) => {
        console.log('event from usernameinputhandler')
        console.log(event)
        inputHandler(event, SET_AGE_INPUT)
    }

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
    
    const inputfocus = async () => { TOGGLE_INPUT_FOCUS( { payload: 'age' } ) }
                                                                                
    const renderUsernameInput = () => {
        return (
          <>
            <input
              value={AGE_INPUT}
              onMouseEnter={ghosttext}
              onChange={ageinputhandler}
              onFocus={inputfocus}
              id="age"
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
    SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action)),
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action))
})

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(AgeInput)

export default ConnectedUsernameInput