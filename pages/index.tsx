// @ts-nocheck
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState, useContext, createContext } from 'react'
import $ from 'jquery'
import Axios from 'axios';
                    
export default  function main ( props:any, context ) {       
    const RenderMain = () => {
        return (
          <>
          <p> teehee </p>
          </>
        )        
    }
return <Container className=""> { RenderMain() } </Container>

}

export async function getServerSideProps(context:any) {              
  // let url:any = await ReturnUrl(context);    
  // let localhost = url
  // // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
  // let predata = await fetch(new URL(`${url}/api/strains/strain`))            
  // let serverdata = await predata.json()     
  
  // let ALLstrainPOSTurl = `${url}/api/strains/allStrain`
  const me = { i: 'me' }

return {
props: {
  // serverdata, localhost, ALLstrainPOSTurl
  me
}
};
}
