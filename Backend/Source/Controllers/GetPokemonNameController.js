const axios = require('axios');

require('dotenv').config()

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const { Op } = require('sequelize')

const GetPokemonNameController = async (req, res) => {
  try {
    
    const { name } = req.query
    
    const pokemonFromDB = await Pokemon.findAll({
      where: {
        nombre: {
          [Op.eq]: `%${name}%`
        }
      },
      include: Type
    })
    
    const apiResponse = await axios.get(`${process.env.API_URL}${name}`)
    const types = apiResponse.data.types.map(type => type.type.name)
    const apiData = {
      id: apiResponse.data.id,
      nombre: apiResponse.data.name,
      imagen: apiResponse.data.sprites.other.dream_world.front_default,
      vida: apiResponse.data.stats[0].base_stat,
      ataque: apiResponse.data.stats[1].base_stat,
      defensa: apiResponse.data.stats[2].base_stat,
      velocidad: apiResponse.data.stats[5].base_stat,
      altura: apiResponse.data.height,
      peso: apiResponse.data.weight,
      types: types
    }
    if(apiData) res.status(200).json([apiData])
    else if(pokemonFromDB) res.status(200).json([pokemonFromDB])
    else res.status(500).json({'Error 404': 'No encontrado.'})

  }
  catch (error) {
    res.status(500).json({'Error Message': error.message, Error: error})
  }
  
}

module.exports = GetPokemonNameController
