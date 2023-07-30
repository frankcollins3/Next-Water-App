export default async function isItDeadYet(key:string) {
        const item:any = localStorage.getItem(key)
        if (!item) return null;
        let parsedItem = item !== null ? JSON.parse(item) : null;

        if (new Date().getTime() > item.expiration) {
            localStorage.removeItem(key)
            return null;
        }
        return await JSON.parse(item).value        
}