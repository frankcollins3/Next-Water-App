import "./logininput.css"
import { connect, useDispatch } from 'react-redux'
import { SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT } from '../../../redux/actions'
import React, {useState} from 'react'

import {nothingFunc, passwordTogglevalue} from '../../../utility/UtilityValues'
import {useImage} from '../../../utility/Contexts/ImgContext'

// EMAIL_OR_USERNAME_LOGIN_INPUT: 'test_email_pw',
//     PASSWORD_LOGIN_INPUT: 'testpw',

interface Props {
    inputType: string,
    EMAIL_OR_USERNAME_LOGIN_INPUT: string,
    PASSWORD_LOGIN_INPUT: string,
    SET_EMAIL_OR_USERNAME_LOGIN_INPUT: any
    SET_PASSWORD_LOGIN_INPUT: any
}

 function LoginInput(props: Props) {

    const [loginPasswordToggleValue, setLoginPasswordToggleValue] = useState(false)

    const { 
        inputType, EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT,
        SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT,
    } = props

    const { statistics } = useImage()

    const loginOnChangeHandler = (event:any) => {
        let target = event.target
        let value:string = event.target.value
        let id:string = target.id
        if (id === 'emailOrUsername') {
            SET_EMAIL_OR_USERNAME_LOGIN_INPUT( {payload: value} )
        } else {
            SET_PASSWORD_LOGIN_INPUT( {payload: value} )
        }
    }
    
    const passwordToggleValueFunc = () => {
        passwordTogglevalue(loginPasswordToggleValue, setLoginPasswordToggleValue)
    }

    const renderLoginInput = () => {
        return (
            <div className="column">
    <input id={inputType} value={inputType === 'emailOrUsername' ? EMAIL_OR_USERNAME_LOGIN_INPUT : PASSWORD_LOGIN_INPUT } spellCheck="false" onChange={loginOnChangeHandler} type={inputType === 'password' ? loginPasswordToggleValue ? "text" : "password" : "text"} />
                {
                    inputType === 'password'                    
                    ? <img id={inputType} onClick={passwordToggleValueFunc} className="login-password-show-img" style={{ border: 'none', height: '25px', width: '25px', alignSelf: 'center' }} src={statistics}/>
                    // ? <img style={{ border: 'none', opacity: "0.1", height: '25px', width: '25px', alignSelf: 'center' }} src={statistics}/>
                    : <pre> </pre>
                }                        
            </div>            
        )
    }

    return <div className="LoginInput-Container">{renderLoginInput()}</div>

}

const mapStateToProps = (state:any) => ({
    EMAIL_OR_USERNAME_LOGIN_INPUT: state.EMAIL_OR_USERNAME_LOGIN_INPUT,
    PASSWORD_LOGIN_INPUT: state.PASSWORD_LOGIN_INPUT,
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_EMAIL_OR_USERNAME_LOGIN_INPUT: (action:any) => dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT(action)),
    SET_PASSWORD_LOGIN_INPUT: (action:any) => dispatch(SET_PASSWORD_LOGIN_INPUT(action))
})

const ConnectedLoginInput = connect(mapStateToProps, mapDispatchToProps)(LoginInput)

export default ConnectedLoginInput