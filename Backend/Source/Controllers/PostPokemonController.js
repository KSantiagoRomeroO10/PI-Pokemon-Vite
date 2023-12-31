require('dotenv').config()
const axios = require('axios')

const { Pokemon } = require('../Models/Index')
const { Type } = require('../Models/Index')

const PostPokemonController = async (req, res) => {

  const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, type } = req.body

  try {

    const existingPokemon = await Pokemon.findOne({ where: { nombre: nombre } })

    if (existingPokemon) {
      return res.status(400).json({ mensaje: 'El Pokemon ya existe, no se registrará nuevamente.' });
    }
    else{

      let maxIdPokemon = 1025

      await Pokemon.max('id')
      .then(max => {
        if(max) maxIdPokemon = max
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
//   "nombre": "Pikachu",
//   "imagen": "pikachu.jpg",
//   "vida": 50,
//   "ataque": 40,
//   "defensa": 35,
//   "velocidad": 60,
//   "altura": 0.4,
//   "peso": 6,
//   "type": ["Electric"]
// }
