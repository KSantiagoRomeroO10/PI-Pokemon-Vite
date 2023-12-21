const express = require('express')
const router = express.Router()

const GetPokemonRoute = require('./GetPokemonRoute')
const GetPokemonIdRoute = require('./GetPokemonIdRoute')
const GetPokemonNameRoute = require('./GetPokemonNameRoute')
const GetTypesRoute = require('./GetTypesRoute')
const PostTypesRoute = require('./PostPokemonRoute')

router.use('/get', GetPokemonRoute) // http://localhost:3000/get/pokemon
router.use('/get', GetPokemonIdRoute) // http://localhost:3000/get/pokemon/:id
router.use('/get', GetPokemonNameRoute) // http://localhost:3000/get/name?name=pikcachu
router.use('/get', GetTypesRoute) // http://localhost:3000/get/types
router.use('/post', PostTypesRoute) // http://localhost:3000/post/pokemon

module.exports = router
