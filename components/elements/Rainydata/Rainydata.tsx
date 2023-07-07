import React, { useState, useEffect } from 'react' 
import {useImage} from '../../../utility/Contexts/ImgContext'
// pre_
import "./rainydata.css"
import {nothingFunc} from '../../../utility/UtilityValues'
import $ from 'jquery'

const RainyData = () => {    
     
    const [peek, setPeek] = useState(false);
    const { window, curtain } = useImage();
    const [lastChar, setLastChar] = useState("");
    const [inputVal, setInputVal] = useState("city name");
    const [focusYet, setFocusYet] = useState(false);
    const [api, setApi] = useState('');
    const [weatherKey, setWeatherKey] = useState('');
    const [rainText, setRainText] = useState('');
    const inputValJQ = $('#input-val')

    const { bgBlue } = useImage()

    // const {APIsplit} = useRegex()

    const environment = process.env.NODE_ENV

    useEffect( () => {
        (async() => {
            // webpack for API
            setApi(environment === 'development' ? "http://localhost:5000/" : "amazonEC2.com/myapp/waterapp")            
            // let pre_envdata:any = await fetch(`${api}fill_cont?query={ENV{DATABASE_URL,API,NODE_ENV,GOOGLE_ID}}`)
            // pre_envdata = await pre_envdata.json()
            // let envdata = pre_envdata.data.ENV  
            // let envAPI = envdata.API.split(APIsplit)            
            // setApi(envdata.NODE_ENV === 'development' ? envAPI[0] : envAPI[1])            
        })()
    })
    

    const peeek = () => setPeek(!peek)

    const pullCurtain = () => {
        if (!peek) {
          console.log("no water peek")
          peeek()
        } else {
          peeek()
        }
    }

    const fakeChanger = (event:any) => {
        let key:string = event.key
        const clickCondition = key === 'Tab' || key === 'Meta' || key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Option' || key === 'Enter' || key === 'ArrowRight' || key === 'CapsLock'
        if (clickCondition) {
            setLastChar(key)
            return
        }
        if (lastChar === "Shift" && key === "ArrowLeft") { setInputVal("")}
        if (key === "ArrowLeft") return
        else { key === "Backspace" ? setInputVal(`${inputVal.slice(0, -1)}`) : setInputVal(`${inputVal}${key}`) }    
        setLastChar('')
    }

    const checkCityRain = async () => {
        // <inputid="input-val" value={inputVal}/> THIS IS FROM value={inputVal}            const [inputVal, setInputVal] = useState("city name");  * * * state comes from local declaration no redux.         

        let inputvalue:any = $(inputValJQ).attr('value')    // cant be string even if the value returned is a string because then .attr() wouldn't be available as a method to be used on such an element.
        
        // this PROMISE retrieves the key from /server/index.js -> ENV_WEATHER from GraphQL query.
        const keyPROMISE = new Promise(async(resolve:any, reject:any) => {
            let prekey:any = await fetch(`${api}fill_cont?query={ENV_WEATHER}`)
            prekey = await prekey.json()
            let weatherkey = prekey.data.ENV_WEATHER            
            setWeatherKey(weatherkey)
            // resolve the weatherkey as a PROMISE
            resolve(weatherkey ? weatherkey : "nokey")
        })
        keyPROMISE
        .then(async(key:any) => {               // key here is from accuweatherAPI it is the key to use their resources at all. It isn't a locationKey it's the clientKEY
            // $(inputValJQ).attr('value') input valule is from the input it is the city name that the user specifies to determine the search params.
            let pre_location:any = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${inputvalue}&offset=25`)
            pre_location = await pre_location.json()
            // accuweatherAPI on their API usage documentation they mention you need a * * * LOCATIONKEY * * *  ----> this key and the user key are then called together to retrieve weatherdata specific to location.
            let keyToTheCity = pre_location[0].Key
            if (!keyToTheCity) { 
                setRainText("Cant Find City. Sorry!")
            }
            let cityName:string = pre_location[0].EnglishName
            const rainPROMISE = new Promise(async(resolve:any, reject:any) => {         
                //    keyToTheCity === locationKey from accuweather.com/locations/ data call.                               key is the client key to use those services as stated above. they can be confusing.
                let currentLocationConditions:any = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${keyToTheCity}?apikey=${key}`)      
                currentLocationConditions = await currentLocationConditions.json()                                
        //   usage down here should be straightforward. if it hasPrecipitation, which is a boolean associated with current conditions, 1) setRainText 2) affect UI with those changes to state determined by API call data
                // let weathertext:string = currentLocationConditions[0].WeatherText     
                let rain:boolean = currentLocationConditions[0].HasPrecipitation                
                if (rain === false) {
                    // setRainText(`It's not raining in ${cityName}`)
                    setRainText(`No rain in ${cityName}`)
                    $('#rainydata-cont').css('background-image', `none`)
                } else {
                    // setRainText(`${cityName}`)
                    setRainText(`Rainy Day in ${cityName}`)
                    $('#rainydata-cont').css('background-image', `url('${bgBlue}')`)
                }      
                resolve (rainText ? rainText : 'No rainText')          
            })          
            rainPROMISE
            .then( (text:any) => {
                console.log('text')
                console.log(text)
                return
            })  
        })
    }
    
    const noValueFocus = () => { focusYet ? nothingFunc() : setInputVal('') }

    const nounusedvars = () => { 
        let state = 1;
        if (state === 1) return         
        setFocusYet(true) //
        let unusedkey = weatherKey      // this key becomes (key:any) => in promise .then block. the original state is never read.
        return unusedkey
    }




    const RenderRainyData = () => {
        return (
            <>
            <img style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className="curtain" src={peek ? window : curtain} alt="curtain for rain" />
            <h1 style={{ color: rainText ? "silver" : '#73defe' }} onClick={nounusedvars} className="text"> { rainText ? rainText : peek ? "Which City" : "Is it Raining Out there?" } </h1>
            {/* <h1 className="text"> { peek ? "Which City" : "Is it Raining Out there?" } </h1> */}
            <input style={{ display: peek ? "" : "none" }} onKeyDown={fakeChanger} onChange={nothingFunc} onFocus={noValueFocus} type="text" id="input-val" value={inputVal}/>

    <button onClick={checkCityRain} style={{ display: peek ? "" : "none", backgroundImage: `url('${curtain}')`}}> </button>    
            </>
        )
    }
    return <div id="rainydata-cont" className={rainText.slice(0, 5) === "Rainy" ? "its-raining-cont" : ""}> {RenderRainyData()} </div>

}

export default RainyData