import axios from 'axios'

export const resolvers = {
    Query: {
    links:() => [
            // this is the resolver so doing anything in this function is fair game.
        {
            id: 1,
            title: "mouse droplet",
            description: 'small water drop',
            category: 'water drops',
            imageUrl: "/water_img/mouse_droplet",
            url: "localhost:3000",
            users: [1],
        },
        {
            id: 2,
            title: "empty drop",
            description: 'empty water drop',
            category: 'water drops',
            imageUrl: "/water_img/bg_blue",
            url: "localhost:3000",
            users: [1],
        },

    ],
    pokemon: async () => {
        let pokeurl:string = `http://pokeapi.co/api/v2/pokemon/`
        let predata = await axios.get(pokeurl)        
        let pokemon = predata.data.results
        let randompokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
        let randomName:string = randompokemon.name
        // let randomId:string = randompokemon.id

        return { name: randompokemon.name, id: 0 }
    }

    }
}