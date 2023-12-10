require('dotenv').config()
const axios = require('axios')

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const PostPokemonController = async (req, res) => {

  const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, type } = req.body

  try {

    const apiResponse = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}`)
    let maxIdPokemon

    await Pokemon.max('id')
    .then(max => {
      if(max) maxIdPokemon = max
      else maxIdPokemon = apiResponse.data.count
      console.log(maxIdPokemon)
    })
    .catch(error => {
      console.log(error);
    })

    const newPokemon = await Pokemon.create({
        id: maxIdPokemon+1,
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso
      }
    )

    if (type && type.length > 0) {
      for (const typeName of type) {
        let type = await Type.findOne({ where: { nombre: typeName } })
        if (!type) {
          type = await Type.create({ nombre: typeName })
        }
        await newPokemon.addType(type)
      }
    }

    res.status(201).json({ mensaje: 'Pokemon created succesful.'})
  } 
  catch (error) {
    res.status(500).json({ 
      Message: error.message,
      Error: error
    })
  }
}

module.exports = PostPokemonController

// para registar mediante esta API, crea los teams si no existen
// {
//   "nombre": "Charizard",
//   "imagen": "https://example.com/charizard.png",
//   "vida": 78,
//   "ataque": 84,
//   "defensa": 78,
//   "velocidad": 100,
//   "altura": 1.7,
//   "peso": 90.5,
//   "type": ["Fire", "Flying"]
// }


