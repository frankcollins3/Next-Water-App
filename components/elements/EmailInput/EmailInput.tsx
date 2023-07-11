import React from 'react'
import "./emailinput.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'

import { SET_EMAIL_INPUT, TOGGLE_INPUT_FOCUS } from '../../../redux/actions'

 function EmailInput (props:any) {
    
    const { EMAIL_INPUT, SET_EMAIL_INPUT, TOGGLE_INPUT_FOCUS } = props
    
    const emailinputhandler = (event:any) => {        
        inputHandler(event, SET_EMAIL_INPUT)
    }

    const inputfocus = () => {
        TOGGLE_INPUT_FOCUS( { payload: 'email' })
    }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)        
    }

    const renderEmailInput = () => {
        return (
        <input value={EMAIL_INPUT} onFocus={inputfocus} onMouseEnter={ghosttext} onChange={emailinputhandler} id="email" type="text"></input> 
        )
    }

    return (<div className="EmailInput-Container">{renderEmailInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    EMAIL_INPUT: state.EMAIL_INPUT,
    ALL_EMAILS: state.ALL_EMAILS
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_EMAIL_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action)),
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action))
})

const ConnectedEmailInput = connect(mapStateToProps, mapDispatchToProps)(EmailInput)

export default ConnectedEmailInput
