  import React from 'react'

  export default function setItemWithExpiration(key:string, value:string, weeks:number) {
      const weekExpirationInMinutes:number = 10080    

      const item = {
        value: value,
        expiration: new Date().getTime() + weekExpirationInMinutes * weeks, // Calculate expiration time
      };
      localStorage.setItem(key, JSON.stringify(item));
    }
