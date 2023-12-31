const request = require('supertest')
const express = require('express')
const app = express()

// Importa las rutas de tu aplicación
const router = require('../Source/Routes/Index')

// Agrega las rutas a la aplicación
app.use(router)

// Prueba para la ruta GetPokemonRoute
describe('GET /get/pokemon', () => {
  it('La respuesta debe ser un JSON que contenga una lista de pokemones', async () => {
    const response = await request(app).get('/get/pokemon')

    expect(response.status).toBe(200)
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
})

describe('GET /get/pokemon/:id', () => {
  it('responds with JSON containing the information of the requested Pokemon', async () => {
    const pokemonId = 1 // Ajusta el ID según tus necesidades

    const response = await request(app).get(`/get/pokemon/${pokemonId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
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
        expect.any(String),
        // Puedes agregar más expectativas según la estructura de tu respuesta
      ]),
    })
  })

  it('responds with 404 if the Pokemon is not found', async () => {
    const nonExistentPokemonId = 999 // Ajusta el ID según tus necesidades

    const response = await request(app).get(`/get/pokemon/${nonExistentPokemonId}`)

    expect(response.status).toBe(404)
  })
})
