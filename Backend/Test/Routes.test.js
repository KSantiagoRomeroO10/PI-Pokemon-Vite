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
  }, 20000)

})

describe('GET /get/name', () => {
  it('La respuesta debe ser un JSON que contiene la información del Pokemon', async () => {
    const pokemonName = 'bulbasaur' // Ajusta el nombre según tus necesidades

    const response = await request(app).get(`/get/name?name=${pokemonName}`)

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

  it('Debe devolver un error 500 si el Pokemon no se encuentra', async () => {
    const nonExistentPokemonName = 'nonexistentpokemon'

    const response = await request(app).get(`/get/name?name=${nonExistentPokemonName}`)
    expect(response.status).toBe(500)
  })
})