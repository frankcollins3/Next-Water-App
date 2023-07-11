import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./signuploginchecker.css"
import allDBurl from  "../../../utility/fetch/allDBurl"
import RegexBank from "../../../utility/RegexBank"
import {AgeArray} from "../../../utility/UtilityValues"
import {ALPHABET} from "../../../utility/UtilityValues"

import { TOGGLE_PARENT_CONFIRM } from '../../../redux/actions'

  interface Props {
    loginstate: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    EMAIL_INPUT: string,
    AGE_INPUT: string,
    // ALL_USERS: any,
    ALL_USERNAMES: any, // I think one needs an :any type to have access to [array-based-indexing] even with the variable type to be specified as array
    PARENT_CONFIRM: boolean,
    TOGGLE_PARENT_CONFIRM: any,
    ALL_USERS: [],
    ALL_EMAILS: []
  }

  function SignupLoginChecker(props: any) {

    const { 
        USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT, ALL_USERS, ALL_USERNAMES, ALL_EMAILS, PARENT_CONFIRM,       // redux state
        TOGGLE_PARENT_CONFIRM,      // redux actions
        loginstate                  // component props declared at render from /LoginOutGoogle
    } = props



    let usernameLength:number = USERNAME_INPUT.length
    let RegexMenu:any;

    useEffect( () => {
        (async () => {
            RegexMenu = await RegexBank()
        })()      
    }, [])

    const inputCheckboxHandler = (event:any) => {        
        let checked:boolean = event.target.checked        
        // checked ? TOGGLE_PARENT_CONFIRM() : []      // issue #90 void function.    
        TOGGLE_PARENT_CONFIRM()
        if (checked) {
            console.log(`checked: ${checked}`)
        }        
        // if (checked) TOGGLE_PARENT_CONFIRM()
        return
    }

    const RenderSignupLoginChecker = () => {
        if (loginstate === 'username') {            
            return (
                <div className="Checker-Container">
                    <div className="column">
                    {/* <img className="Checker-Droplet" src={ALL_USERNAMES.map( (username:any, index:number) => username !== USERNAME_INPUT ) ? "/water_img/bg.png" : "water_img/mouse_droplet.png"}/> */}
                    <img className="Checker-Droplet" src={ALL_USERNAMES.includes(USERNAME_INPUT) ? "/water_img/bg.png" : "water_img/mouse_droplet.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p style={{ color: ALL_USERNAMES.includes(USERNAME_INPUT) ? "#686868" : "#73defe" }}> unique </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={usernameLength > 6 && usernameLength < 30 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> length </p>
                    </div>                    
                </div>
            )
        }

        if (loginstate === 'email') {        
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">                
                    <div className="column">
                    <img className="Checker-Droplet" src={ EMAIL_INPUT.includes('@') ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('@') ? "#73defe" : "#686868" }}> @ </p>
                    </div>                    
                    <div className="column">
<img className="Checker-Droplet" src={ 
    EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org"
 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('.com') || EMAIL_INPUT.includes('.net') || EMAIL_INPUT.includes('.org') ? "#73defe" : "#686868" }}> { EMAIL_INPUT.includes('.') ? EMAIL_INPUT.split('.')[1].length === 3 ? `.${EMAIL_INPUT.split('.')[1]}` : ".com" : ".com" } </p>
                    </div>
                </div>
            )
        }

        if (loginstate === 'password') {                        
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">
                    <div className="column">
                    <img className="Checker-Droplet" src={/[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT) ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p style={{ color: /[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> special </p>
                    {/* .replace(/%20|\s|[^a-zA-Z0-9]/g, '') */}

                    {/* <p style={{ color: /[!@#$%^&*()]/.test(PASSWORD_INPUT) ? "#73defe" : "686868" }}> special </p> */}
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={ /[A-Z]/.test(PASSWORD_INPUT) ? "/water_img/mouse_droplet.png" : "/water_img/bg.png" } />
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: /[A-Z]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> CAPS </p>
                    {/* <p style={{ color: PASSWORD_INPUT.replace(/[\/A-Z]/g, '')  ? "#73defe" : "#686868" }}> CAPS </p> */}
                    </div>                    
                    <div className="column">
                    <img className="Checker-Droplet" src={ /[0-9]/.test(PASSWORD_INPUT) ? "/water_img/mouse_droplet.png" : "/water_img/bg.png" }/>

                    <p style={{ color: /[0-9]/.test(PASSWORD_INPUT) ? "#73defe" : "#686868" }}> number </p>
                    {/* <p style={{ color: RegexBank.hasNums.test(parseInt(PASSWORD_INPUT)) ? "#73defe" : "#686868" }}> number </p> */}                    
                    </div>
                </div>
            )
        }

        // if (loginstate === 'age') {       
        //     return (
        //         <h1> thats insane </h1>
        //     )
        // }
        
        if (loginstate === 'age') {       
            console.log("yeah loginstate === age") 
            let check = AgeArray.includes(parseInt(AGE_INPUT))            
            return (
                <div className="Checker-Container">      
                    <div className="column">
<img className="Checker-Droplet" src={ AgeArray.includes(parseInt(AGE_INPUT)) && AGE_INPUT > 0 && PARENT_CONFIRM === false  ? "/water_img/panda.png" : AGE_INPUT.length && AGE_INPUT > 0 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png" }/>
<pre style={{ color: 'silver', display: AgeArray.includes(parseInt(AGE_INPUT)) && AGE_INPUT >= 4 && !PARENT_CONFIRM ? "" : "none"}}
> Hello Droplet! Please tell a Parent or Guardian You visited Us! </pre>

<input onChange={inputCheckboxHandler} type="checkbox" id="parent-checkbox" style={{ display: AgeArray.includes(parseInt(AGE_INPUT)) && AGE_INPUT >= 4 && !PARENT_CONFIRM ? "" : "none", }} />
<label style={{ display: AgeArray.includes(parseInt(AGE_INPUT)) && AGE_INPUT > 4 && PARENT_CONFIRM === false ? "" : "none", }} htmlFor="parent-checkbox" className="custom-checkbox"></label>
                    {/* <p style={{ color: 'orange' }}> {PARENT_CONFIRM ? "yes" : "no" } </p> */}
                    </div>                    
                </div>
            )
        }

        return (
            <p style={{ fontSize: '8px', textAlign: 'center' }}> hey well thats really funny </p>
        )
    }

    return <div className="SignupLoginChecker-Container"> {RenderSignupLoginChecker()} </div>
}

const mapStateToProps = (state:any) => ({
    USERNAME_INPUT: state.USERNAME_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    AGE_INPUT: state.AGE_INPUT,
    ALL_USERS: state.ALL_USERS,
    ALL_USERNAMES: state.ALL_USERNAMES,
    ALL_EMAILS: state.ALL_EMAILS,
    PARENT_CONFIRM: state.PARENT_CONFIRM
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_PARENT_CONFIRM: () => dispatch(TOGGLE_PARENT_CONFIRM())
})

const ConnectedSignupLoginChecker = connect(mapStateToProps,mapDispatchToProps)(SignupLoginChecker)
 
export default ConnectedSignupLoginChecker