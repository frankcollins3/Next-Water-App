import React from 'react'
import "./username.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'

import {SET_USERNAME_INPUT} from '../../../redux/actions'



 function UsernameInput (props:any) {
    
    const {USERNAME_INPUT, SET_USERNAME_INPUT} = props
    
    const usernameinputhandler = (event:any) => {
        inputHandler(event, SET_USERNAME_INPUT)
    }

    const ghosttext = (event:any) => {
        
    }   

    const renderUsernameInput = () => {
        return (
        <input value={USERNAME_INPUT} onMouseEnter={ghosttext} onChange={usernameinputhandler} id="password" type="text"></input> 
        )
    }

    return (<div className="UsernameInput-container">{renderUsernameInput()} </div>)

}

const mapStateToProps = (state:any) => {
    USERNAME_INPUT: state.USERNAME_INPUT
}

const mapDispatchToProps =(dispatch:any) => {
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action))
}

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(UsernameInput)

export default ConnectedUsernameInput