import cookie from 'cookie'

// serverside
export function setCookie(res, name, value, options = {}) {
    const serializedCookie = cookie.serialize(name, value, options) // name, value, options
    res.setHeader('Set-Cookie', serializedCookie)
}

export function parseCookies(req) {
    return cookie.parse(req.headers.cookies || '');
}

// clientside
export function getCookie() {
    if (typeof window === 'undefined') return [];
    
    const cookies = document.cookie.split('; ');
    return cookies;
  }
export function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 11 Nov 1864 00:00:00 UTC; path=/;`;
  }

  export async function userIdFromCookie(name) {
    if (name === null || name === undefined || name === '') return null

    if (name[0] !== undefined || name[0] !== undefined || name[0] !== ' ') {
      const splitChar = name[0].split('***')
      const userId = splitChar[1]
      return userId ? userId : null    
      // const splitChar = name[0].split('***') || name.split('***')
    } else {
      console.log("hey were over here")
    }
    // const splitChar = name.split('***') || name[0].split('***')
    
    // let preregexID = name[0].substring(preIdIndex + 1);
}

export const remembermecookiePROMISE = new Promise( (cookies, milk) => {
  // get cookie and return which will include both the token and the id.
  const precookie = getCookie()           
  cookies(precookie)
  milk("spill")
})

export function iPROMISEcookies () {
  return remembermecookiePROMISE
  .then(async(c) => {
    let cookieIdString = c[1]
    const sliceID = cookieIdString.slice(3)
    return sliceID || "no id"
    // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object
  })
}

 

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
