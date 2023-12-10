const express = require('express');
const router = express.Router();
const GetPokemonNameController = require('../Controllers/GetPokemonNameController');

router.get('/name', GetPokemonNameController);

module.exports = router;
