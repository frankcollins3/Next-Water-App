// this function creates a Promise that sets the key described in the parameter with the JSON.stringify(item) -------> the function then checks for that key and returns it as a confirmation. "reject" str if user not found.
export default async function stringifyItemSetItem(item:(any|object), key:string) {     // object
      const StringKeyPromise = new Promise( (resolve:any, reject:any) => {
          JSON.stringify(item)
          localStorage.setItem(key, item)
          let getItem = localStorage.getItem(key)
          let confirmation = localStorage.getItem(key) != null ? getItem : "reject"
          resolve(confirmation) // remove need to return promise with reject 
      })
      return StringKeyPromise
      .then( (confirmation:any) => {return confirmation})      
}