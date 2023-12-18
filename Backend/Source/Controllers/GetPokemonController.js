const axios = require('axios')
require('dotenv').config();

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const GetPokemonController = async(req, res) => {
  try{
    const dbPokemon = await Pokemon.findAll({include: Type})    

    // let pages = true
    // let numberPage = 0
    // const apiResponseAllPage = []

    // while(pages) {

    //   let apiResponse = await axios.get(`${process.env.API_URL}?offset=${numberPage}&limit=20`)
    //   apiResponseAllPage.push(...apiResponse.data.results)
    //   numberPage += 20

    //   if(numberPage === 100) pages = false

    // }

    const cantidadPokemons = 50

    const apiResponse= await axios.get(`${process.env.API_URL}?offset=0&limit=${cantidadPokemons}`)
    const apiResponseAllPage = apiResponse.data.results
    
    const newFormatPokemon = await Promise.all(apiResponseAllPage.map(async (pokemon) => {
      const apiResponseUrl = await axios.get(pokemon.url)
      const types = apiResponseUrl.data.types.map(type => type.type.name)
      return {
        id: apiResponseUrl.data.id,
        nombre: pokemon.name,
        imagen: apiResponseUrl.data.sprites.other.dream_world.front_default,
        vida: apiResponseUrl.data.stats[0].base_stat,
        ataque: apiResponseUrl.data.stats[1].base_stat,
        defensa: apiResponseUrl.data.stats[2].base_stat,
        velocidad: apiResponseUrl.data.stats[5].base_stat,
        altura: apiResponseUrl.data.height,
        peso: apiResponseUrl.data.weight,
        types: types
      }
    }))
  
    res.status(200).json(['Api: ', ...newFormatPokemon, 'Database: ',...dbPokemon])

  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message, Error: error })
  }
}

module.exports = GetPokemonController