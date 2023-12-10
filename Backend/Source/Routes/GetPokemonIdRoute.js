const express = require('express');
const router = express.Router();
const GetPokemonIdController = require('../Controllers/GetPokemonIdController');

router.get('/pokemon/:id', GetPokemonIdController);

module.exports = router;
