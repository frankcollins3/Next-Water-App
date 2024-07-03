import axios from "axios"
let url = "https://pokeapi.co/api/v2/pokemon?limit=151"
// url:string = "{...}" in typescript

export default async function allAPI () {
    let predata = await axios.get(url)
    let data = predata.data.results
    return data
}