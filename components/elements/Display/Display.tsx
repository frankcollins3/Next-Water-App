import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { connect, useDispatch } from 'react-redux'
import {useImage} from '../../../utility/Contexts/ImgContext'
import './display.css';

 function Display(props:any) {

  const { PROGRESS } = props

  // const { mouseWaterCup } =

  const [isBooped, setIsBooped] = useState(false);
  const x = 0;
  const y = 0;
  const rotation = 60;
  const scale = 1;
  const timing = 50;

  const style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    textAlign: 'center',
    color: '#333333',
    fontWeight: 'bolder',
    transform: isBooped
      ? `translate(${x}px, ${y}px)
       rotate(${rotation}deg)
       scale(${scale})`
      : `translate(0px, 0px)
       rotate(0deg)
       scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });
  useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = () => {
    setIsBooped(true);
  };
  // the progress "bar" for completion progress
  return (
    <div  
     className="display-container">
      <div
        className="progress-bar"
        style={{
          background: `linear-gradient(0deg, rgba(114,211,254,1) 0%, rgba(255,255,255,0) ${Math.ceil(PROGRESS*100)}%)`,
        }}
      >
        {/* <img src="/water_img/clear-water-drop.png" /> */}
        <animated.div onMouseEnter={trigger} className="progress">
          {Math.ceil(PROGRESS*100)} %
        </animated.div>
      </div>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    PROGRESS: state.PROGRESS
})

const ConnectedDisplay = connect(mapStateToProps)(Display)
export default ConnectedDisplay