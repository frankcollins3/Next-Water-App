import cookie from 'cookie'

// serialize cookies with params
export function setCookie(name, value, options = {}) {
    const serializedCookie = cookie.serialize(name, value, options) // name, value, options
    res.setHeader('Set-Cookie', serializedCookie)
}

export function parseCookies(req) {
    return cookie.parse(req.headers.cookies || '');
}
