import React from 'react';
import './credits.css';
import { connect, useDispatch } from 'react-redux'
import {useImage} from '../../../utility/Contexts/ImgContext'
import ConnectedDisplay from '../../../components/elements/Display'

import {TOGGLE_FLIP_FLOP_ICON} from "../../../redux/actions"

  function Credits( props: any ) {

    const { PROGRESS, REMINDER_CLICK_COUNT } = props

    const { bottle, smallDroplet, bg } = useImage()

  const {
    FLIP_FLOP_ICON, ICON_NOT_INPUT,
    TOGGLE_FLIP_FLOP_ICON
  } = props
  
  const stateToggle = () => {
    TOGGLE_FLIP_FLOP_ICON()
  }

  const RenderCredits = () => {

    return (
      <>
      <div>          
            <img src={bottle} />          
        </div>
  
        <div>
          {/* <a href="https://github.com/WAPP-Water-App">
          </a> */}
            
            {/* {
          window.location.pathname === "/loginoutgoogle" && ICON_NOT_INPUT ? (
            <img style={ { opacity: FLIP_FLOP_ICON ? "1.0" : "0.333"}}
            onClick={stateToggle} src="/water_img/sandals.png" />
            ) : (
              <div></div>
              )
            } */}

        </div>
        <div>
          <ul>
            {
              PROGRESS > .01
                    ?
              <ConnectedDisplay/>
                    :
                REMINDER_CLICK_COUNT > 0 && PROGRESS < 0.1 
                ? <img src={bg}/>
                : <img src={smallDroplet}/>


            }
  
          </ul>
        </div>  
      </>
    );

  } 

  return <div className="credits-container">{RenderCredits()}</div>

}
  

  const mapStateToProps = (state:any) => ({
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    PROGRESS: state.PROGRESS,
    REMINDER_CLICK_COUNT: state.REMINDER_CLICK_COUNT
})

  const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_FLIP_FLOP_ICON: () => dispatch(TOGGLE_FLIP_FLOP_ICON())
  })

   
  const ConnectedCredits = connect(mapStateToProps,mapDispatchToProps)(Credits)

  export default ConnectedCredits