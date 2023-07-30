const timeoutFunc = (func:any, timeout:number) => {
        return setTimeout(async() => {
            return await func()
        }, timeout)
}
