import React from 'react';
import Boop from '../Boop';
import Streak from '../Streak';
import Timer from '../Timer';
import './panel.css';
import {connect} from 'react-redux'
import {useState} from 'react'
import {useImage} from '../../../utility/Contexts/ImgContext'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

 function Panel({ date, hydroIntake, hydroSchedule, BORDER_40_WATER_LIFE }) {

  const [timer, setTimer] = useState();

  const { clock, panda, calendar, target } = useImage()

  const clockclick = () => {
      console.log('timer')
      console.log(timer)
      console.log(typeof timer)
  }  

  const RenderPanel = () => {

    return (
      <>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <Boop rotation={10} timing={150}>
          {/* timer < 0 || timer > 3600 * 6 || timer === NaN */}
            <img onClick={clockclick} src={ typeof timer === "number" ? clock : panda }/>
            {/* <img src={ timer < 0 || timer > 3600 * 6 || timer === NaN ? clock : panda} /> */}
          </Boop>
          <Timer hydroSchedule={hydroSchedule} timer={timer} setTimer={setTimer} />
        </div>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <Streak />
        </div>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <div>
            <Boop rotation={10} timing={150}>
              <img src={calendar} />
            </Boop>
            <span style={{ color: 'silver', fontWeight: 'bolder' }}>{date}</span>
          </div>
          <div style={{ marginLeft: '12px'}}>
            <Boop rotation={10} timing={150}>
              <img src={target} />
            </Boop>
            <span style={{ color: 'silver', fontWeight: 'bolder' }}>
              { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz
              {/* { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz / {(hydroIntake? hydroIntake: 0 / 8).toFixed(3) } cups */}
            </span>
          </div>
        </div>
      
      </>
    );
  } 

  return <div style={{ borderTop: BORDER_40_WATER_LIFE ? "none" : "7.5px dashed #dedede70", borderBottom: BORDER_40_WATER_LIFE ? "none" : "7.5px dashed #dedede70"}} className="panel-container"> {RenderPanel()} </div>

  }


const mapStateToProps = (state) => ({
    BORDER_40_WATER_LIFE: state.BORDER_40_WATER_LIFE
})

const ConnectedPanel = connect(mapStateToProps)(Panel)
export default ConnectedPanel
