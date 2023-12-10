const express = require('express')
const router = express.Router()
const PostPokemonController = require('../Controllers/PostPokemonController')

router.post('/pokemon', PostPokemonController)

module.exports = router
