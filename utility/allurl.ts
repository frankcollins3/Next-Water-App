// URL bank for APP-API 
export default async function allDBurl () { 
    
// This func fetches GQL endpoint to get process.env.api. Then returns concatenated url strings data calls appwide. see bottom of code for explanation.

    // 1: fetch to GraphQL endpoint for env variables. 
    let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,API,NODE_ENV,GOOGLE_ID,EUSER}}`)
    // let pre_envdata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,NODE_ENV}}`)
    let env_data = await pre_envdata.json()
    let data = env_data.data.ENV
    
    // 2: split the API because it has both localhost:5000 and a currently mock deployment URL separated by three '***'
    let preAPI = data.API
    let dev_and_prod = preAPI.split('***')

    let env_dev:string = dev_and_prod[0]
    let env_prod:string = dev_and_prod[1]

    let NODE_ENV = data.NODE_ENV    

    // ternary to set it to [ dev | prod ] mode.
    let API = NODE_ENV === 'development' ? env_dev : env_prod
    // let API = NODE_ENV === 'development' ? env_prod : env_dev

    // object with values to be assigned. env is already assigned since we have that data already.
    let urlObject = {
        API: '',    
        allDBsettingsURL: '',
        allDBusersURL: '',
        allDBdataURL: '',
        ENVdata: env_data,
    }

    const applyAPI = () => {
        if (NODE_ENV === 'development' || NODE_ENV === 'production') {
            urlObject.API = API;
            urlObject.allDBsettingsURL = `${API}fill_cont?query={allDBsettings{id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`;
            urlObject.allDBusersURL = `${API}fill_cont?query={allDBusers{id,googleId,username,email,password,age}}`
            urlObject.allDBdataURL = `${API}fill_cont?query={allDBdata{google_id,date,progress,weekday,status,users_id}}`
            // urlObject.data = `${API}fill_cont?query={singledata(users_id:1){google_id,progress,weekday,date,status,users_id}}`            
        } else {
            // let test_query = `{allDBsettings{id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`
        }
    }
    applyAPI()

    // create promise and resolve the assigning of object values from the ENV GraphQL query return data.
    const UrlObjectPromise = new Promise( (resolve, reject) => {
            resolve(applyAPI())
            reject({ no: 'stop' })
    })

    //  async promise with .then()--->                the object and promise get returned so they data should/would be returned if there is no problem with the fetch()
    return UrlObjectPromise.then(() => {
        return urlObject
    })    
}
// almost used createContext() for this instead.
