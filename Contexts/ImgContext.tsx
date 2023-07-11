import React, { createContext, useContext, ReactNode, useState } from "react";

const imagePrefix:string = "/water_img/"
const googlePrefix:string = "/google_img/"

// type the state which will be read-only 'string'
type imgContextType = {
    gameOn: string;
    bg: string;
    bgBlue: string;
    clock: string;     
    calendar: string   
    mouseWaterCup: string;
    fullCup: string;
    closeWhite: string;
    close: string;
    confirmation: string;
    exit: string;
    github: string;
    blueGoogle: string;
    home: string;
    instagram: string;
    panda: string;
    settings: string;
    statistics: string;
    location: string;
    target: string;
    twitter: string;
    hand: string;
    wapp: string;
    waterDropWhite: string;
    waterDrop: string;
    msgBottle: string;
    aquaJogging: string;
    ai: string;
    aiPink: string;
    waterPark: string;
    bucket: string;
    faucet: string;
    smallDroplet: string;
    mouseDroplet: string;
    pool: string;
    turtle: string;
    seaHorse: string;
    seaTurtle: string;
    shark: string;
    dolphin: string;
    wasteWater: string;
    boat: string;
    sandals: string;
    bikini: string;
    pants: string;
    puppetCup: string;
    contamination: string;
    bite: string;
    mantaRay: string;
    whale: string;
    squid: string;
    squidOrHook: string;
    ink: string;
    inkBottle:string;
    bottle: string;
    bottles: string;
    cup: string;
    drink: string;
    clouds: string;
    window: string;
    curtain: string;
    googleBigG: string;
    googleRedO: string;
    googleYellowO: string;
    googleLilG: string;
    googleL: string;
    googleE: string;
    multiColorG: string;
    puppeteerSearchTerms: string[]    
    ReusableImageObject: { src: string, size: number, unit: string, className: string | undefined, id: string | undefined, func: any, event: any }
    TestUser: { email: string; googleId: string; icon: string; id: number, password: string, username: string; }


// email
// "me@gmail.com"
// googleId
// ""
// icon
// "http://localhost:3000/water_img/bikini.png"
// id 
// 3
// password
// "$2a$13$a5A9TNr3j43FpOMMa83jqucfvNohMlh8LE2AWWBnn6inDMOeru6zO"
// username
// "wetsand"
    
//  ReusableImage(src: string, size: number, unit: string, className: string | undefined, id: string | undefined, func: any, event: any): React.JSX.Element

};

// define values which will remain static
const imgDefaults: imgContextType = {
    bottle: `${imagePrefix}bottle.png`,
    bottles: `${imagePrefix}bottles.png`,
    cup: `${imagePrefix}cup.png`,
    drink: `${imagePrefix}drink.png`,
    gameOn: 'not playing',
    bg: `${imagePrefix}bg.png`,
    bgBlue: `${imagePrefix}bg-blue.png`,
    clock: `${imagePrefix}clock.png`,     
    calendar: `${imagePrefix}calenar.png`, 
    mouseWaterCup: `${imagePrefix}mouseWaterCup.png`,
    fullCup: `${imagePrefix}fullCup.png`,
    closeWhite: `${imagePrefix}close-white.png`,
    close: `${imagePrefix}close.png`,
    confirmation: `${imagePrefix}confirmation.png`,
    exit: `${imagePrefix}exit.png`,
    github: `${imagePrefix}github.png`,
    blueGoogle: `${imagePrefix}bluegoogle.png`,
    home: `${imagePrefix}home.png`,
    instagram: `${imagePrefix}instagram.png`,
    panda: `${imagePrefix}panda.png`,
    settings: `${imagePrefix}settings.png`,
    statistics: `${imagePrefix}statistics.png`,
    location: `${imagePrefix}location.png`,
    target: `${imagePrefix}target.png`,
    twitter: `${imagePrefix}twitter.png`,
    hand: `${imagePrefix}hand.png`,
    wapp: `${imagePrefix}wapp.png`,
    waterDropWhite: `${imagePrefix}water-drop-white.png`,
    waterDrop: `${imagePrefix}water-drop`,
    msgBottle: `${imagePrefix}msg-bottle.png`,
    aquaJogging: `${imagePrefix}aqua-jogging.png`,
    ai: `${imagePrefix}ai.png`,
    aiPink: `${imagePrefix}aipink.png`,
    waterPark: `${imagePrefix}water-park.png`,
    bucket: `${imagePrefix}bucket.png`,
    faucet: `${imagePrefix}faucet.png`,
    smallDroplet: `${imagePrefix}small_droplet.png`,
    mouseDroplet: `${imagePrefix}mouse_droplet.png`,
    pool: `${imagePrefix}pool.png`,
    turtle: `${imagePrefix}turtle.png`,
    seaHorse: `${imagePrefix}sea-horse.png`,
    seaTurtle: `${imagePrefix}sea-turtle.png`,
    shark: `${imagePrefix}shark.png`,
    dolphin: `${imagePrefix}dolphin.png`,
    wasteWater: `${imagePrefix}waste-water.png`,
    boat: `${imagePrefix}boat.png`,
    sandals: `${imagePrefix}sandals.png`,
    bikini: `${imagePrefix}bikini.png`,
    pants: `${imagePrefix}pants.png`,
    puppetCup: `${imagePrefix}puppet-cup.png`,
    contamination: `${imagePrefix}contamination.png`,
    bite: `${imagePrefix}bite.png`,
    mantaRay: `${imagePrefix}manta-ray.png`,
    whale: `${imagePrefix}whale.png`,
    squid: `${imagePrefix}squid.png`,
    squidOrHook: `${imagePrefix}squidOrhook.png`,
    ink: `${imagePrefix}ink.png`,
    inkBottle:`${imagePrefix}ink-bottle.png`,
    clouds: `${imagePrefix}clouds.png`,
    window: `${imagePrefix}window.png`,
    curtain: `${imagePrefix}curtain.png`,
    googleBigG: `${googlePrefix}google_big_g.png`,
    googleRedO: `${googlePrefix}google_red_o.png`,
    googleYellowO: `${googlePrefix}google_yellow_o.png`,
    googleLilG: `${googlePrefix}google_lil_g.png`,
    googleL: `${googlePrefix}google_l.png`,
    googleE: `${googlePrefix}google_e.png`,    
    multiColorG: `${googlePrefix}multi_color_g`,
    puppeteerSearchTerms: ["blue-ocean", "blue-water", "blue-river", "blue-seacreature", "blue-fish", "blue-octopus", "blue-shark"],
    ReusableImageObject: { src: '', size: 0, unit: '', className: '', id: '', func: '', event: ''},
    TestUser: { email: 'testwaters@gmail.com', googleId: 'testgoogle', icon: '/water_img/hand.png', id: 777, password: 'fullcup', username: 'testwaters'  }    
};

// createContext
const ImgContext = createContext<imgContextType>(imgDefaults);


export function useImage() {
    return useContext(ImgContext);
}

type Props = {
    children: ReactNode;
};

export function ImgProvider({ children }: Props) {
    const [gameOn, setGameOn] = useState<string>('not playing');
    const [ReusableImageObject, setReusableImageObject] = useState({ src: '', size: 0, unit: '', className: '', id: '', func: '', event: ''})
    const [bg, setBg] = useState<string>(`${imagePrefix}bg.png`);
    const [bottle, setBottle] = useState<string>(`${imagePrefix}bottle.png`);
    const [bottles, setBottles] = useState<string>(`${imagePrefix}bottles.png`);
    const [cup, setCup] = useState<string>(`${imagePrefix}cup.png`);
    const [drink, setDrink] = useState<string>(`${imagePrefix}drink.png`);
    const [bgBlue, setBgBlue] = useState<string>(`${imagePrefix}bg-blue.png`);
    const [clock, setClock] = useState<string>(`${imagePrefix}clock.png`);
    const [calendar, setCalendar] = useState<string>(`${imagePrefix}calendar.png`);
    const [mouseWaterCup, setMouseWaterCup] = useState<string>(`${imagePrefix}mouseWaterCup.png`);
    const [fullCup, setFullCup] = useState<string>(`${imagePrefix}fullCup.png`);
    const [closeWhite, setCloseWhite] = useState<string>(`${imagePrefix}close-white.png`);
    const [close, setClose] = useState<string>(`${imagePrefix}close.png`);
    const [confirmation, setConfirmation] = useState<string>(`${imagePrefix}confirmation.png`);
    const [exit, setExit] = useState<string>(`${imagePrefix}exit.png`);
    const [github, setGithub] = useState<string>(`${imagePrefix}github.png`);
    const [blueGoogle, setBlueGoogle] = useState<string>(`${imagePrefix}bluegoogle.png`);
    const [home, setHome] = useState<string>(`${imagePrefix}home.png`);
    const [instagram, setInstagram] = useState<string>(`${imagePrefix}instagram.png`);
    const [panda, setPanda] = useState<string>(`${imagePrefix}panda.png`);
    const [settings, setSettings] = useState<string>(`${imagePrefix}settings.png`);
    const [statistics, setStatistics] = useState<string>(`${imagePrefix}statistics.png`);
    const [location, setLocation] = useState<string>(`${imagePrefix}location.png`);
    const [target, setTarget] = useState<string>(`${imagePrefix}target.png`);
    const [twitter, setTwitter] = useState<string>(`${imagePrefix}twitter.png`);
    const [hand, setHand] = useState<string>(`${imagePrefix}setHand.png`);
    const [wapp, setWapp] = useState<string>(`${imagePrefix}wapp.png`);
    const [waterDropWhite, setWaterDropWhite] = useState<string>(`${imagePrefix}water-drop-white.png`);
    const [waterDrop, setWaterDrop] = useState<string>(`${imagePrefix}water-drop`);
    const [msgBottle, setMsgBottle] = useState<string>(`${imagePrefix}msg-bottle.png`);
    const [aquaJogging, setAquaJogging] = useState<string>(`${imagePrefix}aqua-jogging.png`);
    const [ai, setAi] = useState<string>(`${imagePrefix}ai.png`);
    const [aiPink, setAiPink] = useState<string>(`${imagePrefix}aipink.png`);
    const [waterPark, setWaterPark] = useState<string>(`${imagePrefix}water-park.png`);
    const [bucket, setBucket] = useState<string>(`${imagePrefix}bucket.png`);
    const [faucet, setFaucet] = useState<string>(`${imagePrefix}faucet.png`);
    const [smallDroplet, setSmallDroplet] = useState<string>(`${imagePrefix}small_droplet.png`);
    const [mouseDroplet, setMouseDroplet] = useState<string>(`${imagePrefix}mouse_droplet.png`);
    const [pool, setPool] = useState<string>(`${imagePrefix}pool.png`);
    const [turtle, setTurtle] = useState<string>(`${imagePrefix}turtle.png`);
    const [seaHorse, setSeaHorse] = useState<string>(`${imagePrefix}sea-horse.png`);
    const [seaTurtle, setSeaTurtle] = useState<string>(`${imagePrefix}sea-turtle.png`);
    const [shark, setShark] = useState<string>(`${imagePrefix}shark.png`);
    const [dolphin, setDolphin] = useState<string>(`${imagePrefix}dolphin.png`);
    const [wasteWater, setWasteWater] = useState<string>(`${imagePrefix}waste-water.png`);
    const [boat, setBoat] = useState<string>(`${imagePrefix}boat.png`);
    const [sandals, setSandals] = useState<string>(`${imagePrefix}sandals.png`);
    const [bikini, setBikini] = useState<string>(`${imagePrefix}bikini.png`);
    const [pants, setPants] = useState<string>(`${imagePrefix}pants.png`);
    const [puppetCup, setPuppetCup] = useState<string>(`${imagePrefix}puppet-cup.png`);
    const [contamination, setContamination] = useState<string>(`${imagePrefix}contamination.png`);
    const [bite, setBite] = useState<string>(`${imagePrefix}bite.png`);
    const [mantaRay, setMantaRay] = useState<string>(`${imagePrefix}manta-ray.png`);
    const [squid, setSquid] = useState<string>(`${imagePrefix}squid.png`);
    const [whale, setWhale] = useState<string>(`${imagePrefix}whale.png`);
    const [squidOrHook, setSquidOrHook] = useState<string>(`${imagePrefix}squidOrHook.png`);
    const [ink, setInk] = useState<string>(`${imagePrefix}ink.png`);
    const [clouds, setClouds] = useState<string>(`${imagePrefix}clouds.png`);
    const [window, setWindow] = useState<string>(`${imagePrefix}window.png`);
    const [curtain, setCurtain] = useState<string>(`${imagePrefix}curtain.png`);
    const [inkBottle, setInkBottle] = useState<string>(`${imagePrefix}ink-bottle.png`);
    const [googleBigG, setGoogleBigG] = useState<string>(`${googlePrefix}google_big_g.png`);
    const [googleRedO, setGoogleRedO] = useState<string>(`${googlePrefix}google_red_o.png`);
    const [googleYellowO, setGoogleYellowO] = useState<string>(`${googlePrefix}google_yellow_o.png`);
    const [googleLilG, setGoogleLilG] = useState<string>(`${googlePrefix}google_lil_g.png`);
    const [googleL, setGoogleL] = useState<string>(`${googlePrefix}google_l.png`);
    const [googleE, setGoogleE] = useState<string>(`${googlePrefix}google_e.png`);
    const [multiColorG, setMultiColorG] = useState<string>(`${googlePrefix}multi_color_g.png`);
    const [puppeteerSearchTerms, setPuppeteerSearchTerms] = useState<string[]>(["blue-ocean", "blue-water", "blue-river", "blue-seacreature", "blue-fish", "blue-octopus", "blue-shark"])
    const [TestUser, setTestUser] = useState<any>({email: 'testwaters@gmail.com', googleId: 'testgoogle', icon: '/water_img/hand.png', id: 777, password: 'fullcup', username: 'testwaters' })
    

        // * user functionality ends above
        
    const value = {
    gameOn,
    bg,
    bottle,
    bottles,
    cup,
    drink,
    bgBlue,
    clock,     
    calendar,  
    mouseWaterCup,
    fullCup,
    closeWhite,
    close,
    confirmation,
    exit,
    github,
    blueGoogle,
    home,
    instagram,
    panda,
    settings,
    statistics,
    location,
    target,
    twitter,
    hand,
    wapp,
    waterDropWhite,
    waterDrop,
    msgBottle,
    aquaJogging,
    ai,
    aiPink,
    waterPark,
    bucket,
    faucet,
    smallDroplet,
    mouseDroplet,
    pool,
    turtle,
    seaHorse,
    seaTurtle,
    shark,
    dolphin,
    wasteWater,
    boat,
    sandals,
    bikini,
    pants,
    puppetCup,
    contamination,
    bite,
    mantaRay,
    whale,
    squid,
    squidOrHook,
    ink,
    inkBottle, 
    clouds,   
    window,
    curtain,
    googleBigG,
    googleRedO,
    googleYellowO,
    googleLilG,
    googleL,
    googleE,
    multiColorG,
    puppeteerSearchTerms,
    ReusableImageObject,
    TestUser
    };

    return (
        <>
            <ImgContext.Provider value={value}>
                {children}
            </ImgContext.Provider>
        </>
    );
}




