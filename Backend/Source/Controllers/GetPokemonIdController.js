const axios = require('axios')
require('dotenv').config()

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const GetPokemonIdController = async(req, res) => {
  
  try{

    const { id } = req.params

    if(id >= 1026){
      const dbPokemonResponse = await Pokemon.findByPk(id, { include: Type })
      const types = dbPokemonResponse.Types.map(type => type.nombre)

      const newFormat = {  
        id: dbPokemonResponse.id,
        nombre: dbPokemonResponse.nombre,
        imagen: dbPokemonResponse.imagen,
        vida: dbPokemonResponse.vida,
        ataque: dbPokemonResponse.ataque,
        defensa: dbPokemonResponse.defensa,
        velocidad: dbPokemonResponse.velocidad,
        altura: dbPokemonResponse.altura,
        peso: dbPokemonResponse.peso,
        types: types
      }

      if(newFormat) res.status(200).json(newFormat)
      else res.status(404).json({'Error 404': 'Pokemon not found'})
    }
    else{
      const apiResponse = await axios.get(`${process.env.API_URL}${id}/`)
      const apiData = apiResponse.data
      const types = apiData.types.map(type => type.type.name)

      const newFormat = {  
        id: apiData.id,
        nombre: apiData.name,
        imagen: apiData.sprites.other.dream_world.front_default,
        vida: apiData.stats[0].base_stat,
        ataque: apiData.stats[1].base_stat,
        defensa: apiData.stats[2].base_stat,
        velocidad: apiData.stats[5].base_stat,
        altura: apiData.height,
        peso: apiData.weight,
        types: types
      }

      if(newFormat) res.status(200).json(newFormat)
      else res.status(404).json({'Error 404': 'Pokemon not found'})
    }

    
  }
  catch(error){
    res.status(500).json({ 'Error: ': error.message, 'Error Complete: ': error })
  }
}

module.exports = GetPokemonIdController