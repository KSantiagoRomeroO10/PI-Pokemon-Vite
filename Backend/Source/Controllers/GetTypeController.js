require('dotenv').config();

const axios = require('axios')
const { Type } = require('../Models/Index')

const GetTypeController = async (req, res) => {
  try {
    const dbTypes = await Type.findAll()

    const apiResponse = await axios.get(`${process.env.API_URL_TYPE}`)
    const result = apiResponse.data.results

    // Buscar todos los tipos de la api y guardarlos en un array sin repetirlos 
    const apiTypes = []

    for(let i = 0; i < result.length; i++){
      if(result[i].name){
        apiTypes.push(result[i].name)
      }
    }
    // si no hay nada en la base de datos vamos a registarlos
    
    if(dbTypes.length === 0){
      for(const type of apiTypes) {
        await Type.create({ nombre: type })
      }
    }

    // Si hay existen registros en la base de datos, va a compararlos con el array de teams que sacamos de la api
    // y si no existe el equipo, api vs db, entonces registra ese equipo

    if(dbTypes.length > 0){

      for(const nameType of apiTypes) {

        const type = await Type.findOne({ where: { nombre: nameType } })
        if(!type){
          await Type.create({ nombre: nameType })
        }
        
      }

    }

    const newDBTypes = await Type.findAll()

    res.status(200).json({ 'Types': newDBTypes })

  }
  catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor al obtener los tipos.', error: error.message });
  }
}

module.exports = GetTypeController
