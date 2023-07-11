import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import styles from "./Navbar.module.scss"
import {useImage} from "Contexts/ImgContext"
// import styles from "components/elements/Navbar/Navbar.module.scss"
// import styles from "./navbar.scss"



export default function Navbar(props:any) {

  const { smallDroplet, msgBottle, statistics, settings, exit, clouds } = useImage()
  const flexColumnCenter = ["flex", "row", "justCenterAlignCenter", "noFlexWrap"].join(" ");

  // if (typeof window !== 'undefined') {
  //   CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
  //     $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
  // }

  return (
    <Container className={styles.navbarcontainer}>
    <div>
    <img src={smallDroplet || msgBottle || clouds }/> 
    {/* have to set up ternary this will be toggled depending on the page. */}
    
    {/* <img src={msgBottle}/> */}
    {/* <img style={{ border: 'none' }} id="navbar-droplet" src={smallDroplet} />     */}
    
    
    </div>
      
      <div>
        <img src={statistics}/>
        <img src={settings}/>
      <img id="loginLogoutIcon" src={exit}/>            
      {/* <img id="loginLogoutIcon" src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM && APP_PAGE_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />         */}
          
      </div>
 
    </Container>
  );
}
