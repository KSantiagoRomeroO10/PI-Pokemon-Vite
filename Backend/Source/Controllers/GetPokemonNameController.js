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
          [Op.iLike]: `%${name}%`
        }
      },
      include: Type
    })
    
    const apiResponse = await axios.get(`${process.env.API_URL}${name}`)
    const apiData = apiResponse.data

    if(apiData || pokemonFromDB) res.status(200).json({PokemonApi: apiData, PokemonDB: pokemonFromDB})
    else res.status(500).json({'Error 404': 'No encontrado.'})


  }
  catch (error) {
    res.status(500).json({'Error Message': error.message, Error: error})
  }
  
}

module.exports = GetPokemonNameController
