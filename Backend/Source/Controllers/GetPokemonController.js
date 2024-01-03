const axios = require('axios')
require('dotenv').config()

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const GetPokemonController = async(req, res) => {
  try{
    const dbPokemon = await Pokemon.findAll({include: Type})
    const newFormatDB = dbPokemon.map((pokemonDB) => {
      const typesDB = pokemonDB.Types.map(type => type.nombre)
      return{
        id: pokemonDB.id,
        nombre: pokemonDB.nombre,
        imagen: pokemonDB.imagen,
        vida: pokemonDB.vida,
        ataque: pokemonDB.ataque,
        defensa: pokemonDB.defensa,
        velocidad: pokemonDB.velocidad,
        altura: pokemonDB.altura,
        peso: pokemonDB.peso,
        types: typesDB
      } 
    })

    // se formatea información ya que en el front no se utiliza createdAt ni updatedAt, y además los tipos, anida objetos 
    // un objeto por cada tipo, en el front se trabaja un solo array de nombres, no de objetos  

    // 1302 limite de pokemones en la api externa
    const cantidadPokemons = 60

    // https://pokeapi.co/api/v2/pokemon/?offset=20&limit=200
    const apiResponse = await axios.get(`${process.env.API_URL}?offset=0&limit=${cantidadPokemons}`)
    const apiResponseResults = apiResponse.data.results
    
    // La promesa se utiliza para esperar a que todas las promesas del ma resuelvan, ya que el map devuelve una promesa 
    // resuelta o no por cada elemento iterado.
    const newFormatPokemon = await Promise.all(apiResponseResults.map(async (pokemon) => {
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
  
    res.status(200).json(['Api: ', ...newFormatPokemon, 'Database: ', ...newFormatDB])

  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message, Error: error })
  }
}

module.exports = GetPokemonController