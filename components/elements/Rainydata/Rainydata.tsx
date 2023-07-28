import React, { useState, useEffect } from 'react' 
import {useImage} from 'Contexts/ImgContext'
// pre_
// import "./rainydata.css"
import styles from "./RainyData.module.scss"
import {nothingFunc} from 'utility/UtilityValues'
import $ from 'jquery'
import { __InputValue } from 'graphql'

const RainyData = () => {    
     
    const [peek, setPeek] = useState(false);
    const { window, curtain } = useImage();
    const [lastChar, setLastChar] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [submitVal, setSubmitVal] = useState("");
    const [focusYet, setFocusYet] = useState(false);
    const [api, setApi] = useState('');
    const [weatherKey, setWeatherKey] = useState('');
    const [rainText, setRainText] = useState<any>('');
    const inputValJQ = $('#input-val')
    const [dry, setDry] = useState(false)
    const [wet, setWet] = useState(false)
    const [cloudy, setCloudy] = useState(false)

    const { bg, bgBlue, clouds } = useImage()

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
        const key = event.nativeEvent.key        
        
        setInputVal(key)
        // let key:string = event.key
        const clickCondition = key === 'Tab' || key === 'Meta' || key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Option' || key === 'Enter' || key === 'ArrowRight' || key === 'CapsLock'
            setInputVal("")
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

        // let inputvalue:any = $(inputValJQ).attr('value')    // cant be string even if the value returned is a string because then .attr() wouldn't be available as a method to be used on such an element.
        // setInputVal(inputvalue)

        let submit:any = $(inputValJQ).attr('value')    // cant be string even if the value returned is a string because then .attr() wouldn't be available as a method to be used on such an element.
        console.log('submit')
        
        // this PROMISE retrieves the key from /server/index.js -> ENV_WEATHER from GraphQL query.
        const keyPROMISE = new Promise(async(resolve:any, reject:any) => {
            // let prekey:any = await fetch(`${api}fill_cont?query={ENV_WEATHER}`)
            let weatherkey:any = process.env.NEXT_PUBLIC_WEATHER_APP
            console.log('weatherkey', weatherkey)        
            setWeatherKey(weatherkey)
            // resolve the weatherkey as a PROMISE
            resolve(weatherkey ? weatherkey : "nokey")
        })
        keyPROMISE
        .then(async(key:any) => {               // key here is from accuweatherAPI it is the key to use their resources at all. It isn't a locationKey it's the clientKEY
            let teaneck = "teaneck"

            // $(inputValJQ).attr('value') input valule is from the input it is the city name that the user specifies to determine the search params.
            console.log('submitVal', submitVal)
            let pre_location:any = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${inputVal}&offset=25`)
            // let pre_location:any = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${submitVal}&offset=25`)
            // let pre_location:any = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${teaneck}&offset=25`)
            
            console.log('pre_location', pre_location)
            pre_location = await pre_location.json()
            console.log('pre_location', pre_location)


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
                console.log('current conditions', currentLocationConditions)

                let currConditions = currentLocationConditions[0]
                let weatherText:string = currConditions.WeatherText

        //   usage down here should be straightforward. if it hasPrecipitation, which is a boolean associated with current conditions, 1) setRainText 2) affect UI with those changes to state determined by API call data
                // let weathertext:string = currentLocationConditions[0].WeatherText     

                let rain:boolean = currConditions.HasPrecipitation                
                if (rain === false) {
                    setWet(false)
                    // setRainText(`It's not raining in ${cityName}`)
                    if (weatherText.includes('cloudy')) {
                        setCloudy(true)
                        setRainText(`${cityName} is cloudy`)
                    } else {
                        setDry(true)
                        setRainText(`${cityName} is dry`)
                    }

                    // $(`#${styles.rainyDataCont}`).css('background-image', `url('${bg}')`)
                    // $('#rainydata-cont').css('background-image', `none`)
                } else {
                    setDry(false)
                    setCloudy(false)
                    setWet(true)                    
                    setRainText(`Rainy Day in ${cityName}`)                    
                }      
                resolve (rainText ? rainText : 'No rainText')          
            })          
            rainPROMISE
            .then( (text:any) => {
                setTimeout( () => {
                    setDry(false)
                    setWet(false)
                    setCloudy(false)
                    setInputVal("")
                    setRainText("")

                }, 2000)
                return
            })  
        })
    }
    
    const noValueFocus = () => { focusYet ? nothingFunc() : nothingFunc() }

    const nounusedvars = () => { 
        let state = 1;
        if (state === 1) return         
        setFocusYet(true) //
        let unusedkey = weatherKey      // this key becomes (key:any) => in promise .then block. the original state is never read.
        return unusedkey
    }




    //  cloudy && <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={ clouds } alt="curtain for rain"/> 
    const RenderRainyData = () => {
        return (
            <>
            
                    
{ cloudy && <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={ clouds } alt="curtain for rain" />}            
{ wet && <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={ bgBlue } alt="curtain for rain" />}            
{ dry && <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={ bg } alt="curtain for rain" />}            
{ !dry && !cloudy && !wet && <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={peek ? window : curtain} alt="curtain for rain" />}
            
            {/* <img id="img" style={{ height: '250px', width: '250px'}} onClick={pullCurtain} className={styles.curtain} src={peek ? window : curtain} alt="curtain for rain" /> */}

            <h1 style={{ color: rainText ? "silver" : '#73defe' }} onClick={nounusedvars} className={styles.text}> { rainText ? rainText : peek ? "Which City" : "Is it Raining Out there?" } </h1>
            {/* <h1 className="text"> { peek ? "Which City" : "Is it Raining Out there?" } </h1> */}
            <input style={{ display: peek ? "" : "none" }} onKeyDown={fakeChanger} onChange={nothingFunc} onFocus={noValueFocus} type="text" id={styles.inputVal} value={inputVal}/>

    <button className={styles.button} onClick={checkCityRain} style={{ display: peek ? "" : "none", backgroundImage: `url('${curtain}')`}}> </button>    
            </>
        )
    }
    return <div id={styles.rainyDataCont} className={rainText.slice(0, 5) === "Rainy" ? styles.itsRainingCont : ""}> {RenderRainyData()} </div>
    // return <div id={styles.rainyDataCont} className={rainText.slice(0, 5) === "Rainy" ? {styles.itsRainingCont} : ""}> {RenderRainyData()} </div>

}

export default RainyData
