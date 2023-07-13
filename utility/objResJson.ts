export default async function objResJson (obj:any) {
// export default async function objResJson (obj:object) {
        let objJson = await obj.json()
        return objJson        
}