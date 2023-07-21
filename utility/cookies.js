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
    const cookies = document.cookie.split('; ');
    return cookies;
  }
export function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 11 Nov 1864 00:00:00 UTC; path=/;`;
  }

export function userIdFromCookie(name) {
    name = name[0]
    const splitNameForId = name.split("id:")
    console.log(splitNameForId)

    let userId = splitNameForId[1]
    return userId
    // let preregexID = name[0].substring(preIdIndex + 1);
}

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
