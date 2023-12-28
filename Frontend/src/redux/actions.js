// actions.js
import axios from 'axios'

// Url
const urlBase = 'http://localhost:3000/get/pokemon/'

// Action Types Fetch pokemons
export const FETCH_POKEMONS = 'FETCH_POKEMONS'
export const FETCH_POKEMONS_FAILURE = 'FETCH_POKEMONS_FAILURE'

// Action Creators Fetch pokemons
export const  fetchPokemons = (pokemons) => ({
  type: FETCH_POKEMONS,
  payload: pokemons
})
export const fetchPokemonsFailure = (error) => ({
  type: FETCH_POKEMONS_FAILURE,
  payload: error
})

// Thunk
export const fetchAllPokemons = () => {
  return (dispatch) => {
    axios.get(urlBase)
      .then(response => response.data)
      .then(data => {
        let filteredData = data
        dispatch(fetchPokemons(filteredData))
      })
      .catch(error => {
        dispatch(fetchPokemonsFailure(error.message))
      })
  }
}

// Sort Pokemons
export const SORT_FILTER_POKEMONS = 'SORT_FILTER_POKEMONS'
export const SORT_FILTER_POKEMONS_FAILURE = 'SORT_FILTER_POKEMONS_FAILURE'

export const sortFilterAction = (sFPokemons) => ({
  type: SORT_FILTER_POKEMONS,
  payload: sFPokemons
})
export const sortFilterFailure = (errorSFPokemons) => ({
  type: SORT_FILTER_POKEMONS_FAILURE,
  payload: errorSFPokemons
})

export const sortPokemonsFun = (pokemons, key, order) => {

  try{
    if (!pokemons || !Array.isArray(pokemons)) {
      throw new Error('Pokemons is not a valid array.')
    }
    const sortedPokemons = [...pokemons].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1
      }
      else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    return sortedPokemons
  }  
  catch (error) {
    throw new Error(`Error sorting Pokemons: ${error.message}`)
  }

}

export const filterOriginFun = (originType, pokemons) => {

  try {

    const pokemonOrigin = []
    let aux = false
  
    for (let poke of pokemons) {
      if (originType === 'Api') {
        pokemonOrigin.push(poke)
        if (poke === 'Database: ') break
      }
  
      if (originType === 'DataBase') {
        if (poke === 'Database: ') aux = true
        if (aux) pokemonOrigin.push(poke)
      }
    }
    const resultado = pokemonOrigin.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: ')
    if (resultado.length) return resultado
    else 'No existen pokemones'
  }
  catch (error) {
    throw new Error(`Error filter Pokemons: ${error.message}`)
  }

}
 
// Order estados de control
export const ORDER_STATE = 'ORDER_STATE'
export const ORDER_STATE_FAILURE = 'ORDER_STATE_FAILURE'

export const orderStateAction = (orderState) => ({
  type: ORDER_STATE,
  payload: orderState
})
export const orderStateFailure = (errorOrderState) => ({
  type: ORDER_STATE_FAILURE,
  payload: errorOrderState
})

// Filter estados de control
export const FILTER_STATE = 'FILTER_STATE'
export const FILTER_STATE_FAILURE = 'FILTER_STATE_FAILURE'

export const filterStateAction = (filterState) => ({
  type: FILTER_STATE,
  payload: filterState
})
export const filterStateFailure = (errorFilterState) => ({
  type: FILTER_STATE_FAILURE,
  payload: errorFilterState
})
