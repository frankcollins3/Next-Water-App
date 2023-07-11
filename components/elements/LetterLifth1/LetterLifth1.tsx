import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import "./letterlifth1.css"

interface h1Props {
    FLIP_FLOP_ICON: any,
    ICON_NOT_INPUT: any,
    LOG_IN_OUT_FLASH_MSG: any
}
// Type 'string | boolean' is not assignable to type 'string | TrustedHTML'.
//   Type 'boolean' is not assignable to type 'string | TrustedHTML'.ts(2322)

 function LetterLifth1 (props: h1Props) {

    const { LOG_IN_OUT_FLASH_MSG, ICON_NOT_INPUT, FLIP_FLOP_ICON } = props

    

    const ReturnLetterLifth1 = () => {
        return (
            <>
            <h1> Water is Life </h1>


            <h1 className="lifewater" dangerouslySetInnerHTML={{ __html: ICON_NOT_INPUT && FLIP_FLOP_ICON ? "Water <br> You" : LOG_IN_OUT_FLASH_MSG ? LOG_IN_OUT_FLASH_MSG : 'Water is Life' }}        
        // <h1 className="lifewater" dangerouslySetInnerHTML={{ __html: ICON_NOT_INPUT && FLIP_FLOP_ICON ? "Water You?<br>Water Thoughs" : LOG_IN_OUT_FLASH_MSG ? LOG_IN_OUT_FLASH_MSG : 'Water is Life' }}        
        style={{  
          color: LOG_IN_OUT_FLASH_MSG ? 'silver' : '#73defe', fontSize: LOG_IN_OUT_FLASH_MSG ? '13px' : '32px', fontFamily: LOG_IN_OUT_FLASH_MSG ? 'Poppins' : 'Moon Dance',
          letterSpacing: LOG_IN_OUT_FLASH_MSG ? '0.25em' : '1.175em',
      }}>
        </h1>

            
            </>
        )
    }

    return <div id="LetterLifth1">{ReturnLetterLifth1()}</div>
}

const mapStateToProps = (state:any) => ({   
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    LOG_IN_OUT_FLASH_MSG: state.LOG_IN_OUT_FLASH_MSG,    
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const ConnectedLetterLifth1 = connect(mapStateToProps)(LetterLifth1)
export default ConnectedLetterLifth1