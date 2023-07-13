    export default async function parseItemGetItem(key:string, whichInterface:string) {
    interface User {
        id: number,
        username: string,
        icon: string,
        googleId: string,
        age: number,
        password: string | null | undefined
    }

    interface GoogleToken { 
        googleId: string
    }     

    let rejectionNotice:string[] = ['not', 'working']

    let getItemFromStorage:any = localStorage.getItem(key)
    let stringToJson: User | null | GoogleToken = null;

    const returnAfterTypeAssertion = new Promise( (resolve:any, reject:any) => {
        if (whichInterface === 'user') {
            stringToJson = JSON.parse(getItemFromStorage) as User
        } else if (whichInterface === 'googletoken') {
            stringToJson = JSON.parse(getItemFromStorage) as GoogleToken
        }          
        resolve(stringToJson)
        reject(rejectionNotice)
    })
    return returnAfterTypeAssertion
    .then( (promise:any) => { return promise })
        
    // whichInterface === 'user' ? stringToJson = await localStorage.getItem(key) : 

    // let stringToJson:any = await JSON.parse(item)            
    

                
    }