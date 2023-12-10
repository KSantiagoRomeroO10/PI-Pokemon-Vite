const axios = require('axios')
require('dotenv').config();

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const GetPokemonController = async(req, res) => {
  try{
    const dbPokemon = await Pokemon.findAll({include: Type})    

    let pages = true
    let numberPage = 0
    const apiResponseAllPage = []

    while(pages) {

      let apiResponse = await axios.get(`${process.env.API_URL}?offset=${numberPage}&limit=20`)
      apiResponseAllPage.push(...apiResponse.data.results)
      numberPage += 20

      if(numberPage === 100) pages = false

    }
    
    const newFormatPokemon = await Promise.all(apiResponseAllPage.map(async (pokemon) => {
      const apiResponse = await axios.get(pokemon.url)
      const types = apiResponse.data.types.map(type => type.type.name)
      console.log();
      return {
        id: apiResponse.data.id,
        imagen: apiResponse.data.sprites.other.dream_world.front_default,
        vida: apiResponse.data.stats[0].base_stat,
        ataque: apiResponse.data.stats[1].base_stat,
        defensa: apiResponse.data.stats[2].base_stat,
        velocidad: apiResponse.data.stats[5].base_stat,
        altura: apiResponse.data.height,
        peso: apiResponse.data.weight,
        types: types
      }
    }))
  
    res.status(200).json([...newFormatPokemon, ...dbPokemon])

  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message, Error: error })
  }
}

module.exports = GetPokemonController