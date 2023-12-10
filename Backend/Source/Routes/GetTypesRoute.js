const express = require('express');
const router = express.Router();
const GetTypesController = require('../Controllers/GetTypeController');

router.get('/types', GetTypesController);

module.exports = router;
