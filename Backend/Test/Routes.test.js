const request = require('supertest')
const express = require('express')
const app = express()

// Importa las rutas
const router = require('../Source/Routes/Index')

// Agrega las rutas a la aplicación
app.use(router)

// Prueba para la ruta GetPokemonRoute
describe('GET /get/pokemon', () => {
  
  // Prueba asincrónica: La respuesta debe ser un JSON que contenga una lista de pokemones
  it('La respuesta debe ser un JSON que contenga una lista de pokemones', async () => {
    // Realiza una solicitud GET a la ruta /get/pokemon
    const response = await request(app).get('/get/pokemon')
  
    // Verifica que el código de estado de la respuesta sea 200 (OK)
    expect(response.status).toBe(200)
    // Verifica que el cuerpo de la respuesta sea un array que contenga objetos con propiedades específicas 
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        nombre: expect.any(String),
        imagen: expect.any(String),
        vida: expect.any(Number),
        ataque: expect.any(Number),
        defensa: expect.any(Number),
        velocidad: expect.any(Number),
        altura: expect.any(Number),
        peso: expect.any(Number),
        types: expect.arrayContaining([
          expect.any(String)
        ]),
      })
    ]))
  }, 20000) // Establece un límite de tiempo para la prueba (20 segundos)

})

// Pruebas para la ruta GetNameRoute
describe('GET /get/name', () => {
  
  // Prueba asincrónica: La respuesta debe ser un JSON que contiene la información del Pokemon
  it('La respuesta debe ser un JSON que contiene la información del Pokemon', async () => {
    const pokemonName = 'bulbasaur' // Ajusta el nombre según tus necesidades
    
    // Realiza una solicitud GET a la ruta /get/name con el nombre del Pokemon
    const response = await request(app).get(`/get/name?name=${pokemonName}`)

    // Verifica que el código de estado de la respuesta sea 200 (OK)
    expect(response.status).toBe(200)

    // Verifica que el cuerpo de la respuesta sea un array que contiene objetos con propiedades específicas
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        nombre: expect.any(String),
        imagen: expect.any(String),
        vida: expect.any(Number),
        ataque: expect.any(Number),
        defensa: expect.any(Number),
        velocidad: expect.any(Number),
        altura: expect.any(Number),
        peso: expect.any(Number),
        types: expect.arrayContaining([
          expect.any(String)
        ]),
      })
    ]))
  })

  // Prueba asincrónica: Debe devolver un error 500 si el Pokemon no se encuentra
  it('Debe devolver un error 500 si el Pokemon no se encuentra', async () => {
    // Define un nombre de Pokemon que no existe
    const nonExistentPokemonName = 'nonexistentpokemon'
    
    // Realiza una solicitud GET a la ruta /get/name con un nombre de Pokemon inexistente
    const response = await request(app).get(`/get/name?name=${nonExistentPokemonName}`)

    // Verifica que el código de estado de la respuesta sea 500 (Internal Server Error)
    expect(response.status).toBe(500)
  })
})