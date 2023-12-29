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
    pokemons = pokemons.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: ')
    const sortedPokemons = [...pokemons].sort((a, b) => {
      if(key === 'nombre'){
        if (order === 'asc') {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
        }
        if(order === 'des'){
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1
        }
      }
      if(key === 'ataque'){
        if (order === 'asc') {
          return a[key] > b[key] ? 1 : -1
        }
        else if(order === 'des'){
          return a[key] < b[key] ? 1 : -1
        }
      }
    })
    return sortedPokemons
  }  
  catch (error) {
    return 'Error sort pokemons: ' + error.message
  }
}

export const filterOriginFun = (pokemons, originType, type = null) => {
  try {
    const pokemonOrigin = []
    let auxDB = false
  
    for(let poke of pokemons) {
      if(originType === 'Api') {
        pokemonOrigin.push(poke)
        if(poke === 'Database: ') break
      }
      if (originType === 'DB') {
        if(poke === 'Database: ') auxDB = true
        if(auxDB) pokemonOrigin.push(poke)
      }
    }
    if(pokemonOrigin) return pokemonOrigin.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: ')
    else 'No existen pokemones'
    // Filtrar por type
    if(type){
      if(type === 'all'){
        console.log('Hay que imprimirlos a todos sin importar su origen.')
      }
      else{
        console.log('Filtrar por tipo')
     }
    }
  }
  catch (error) {
    return 'Error filters pokemons: '+error.message
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

// Type
export const TYPES_ARRAY = 'TYPES_ARRAY'
export const TYPES_ARRAY_FAILURE = 'TYPES_ARRAY_FAILURE'

export const typeAction = (typeValue) => ({
  type: TYPES_ARRAY,
  payload: typeValue
})
export const typeFailure = (errorTypeValue) => ({
  type: TYPES_ARRAY_FAILURE,
  payload: errorTypeValue
})