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

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
