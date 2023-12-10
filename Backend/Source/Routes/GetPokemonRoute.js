const express = require('express');
const router = express.Router();
const GetPokemonController = require('../Controllers/GetPokemonController');

router.get('/pokemon', GetPokemonController);

module.exports = router;
