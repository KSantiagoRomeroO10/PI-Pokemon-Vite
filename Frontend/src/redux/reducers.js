// reducers.js
import { FETCH_POKEMONS, FETCH_POKEMONS_FAILURE, SORT_FILTER_POKEMONS, SORT_FILTER_POKEMONS_FAILURE, ORDER_STATE, ORDER_STATE_FAILURE, FILTER_STATE, FILTER_STATE_FAILURE } from './actions'

const initialState = {
  pokemons: [],
  errorPokemons: null,
  sFPokemons: [],
  errorSFPokemons: null,
  orderState: null,
  errorOrderState: null,
  filterState: null,
  errorFilterState: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        errorPokemons: null
      }
    case FETCH_POKEMONS_FAILURE:
      return {
        ...state,
        errorPokemons: action.payload
      }
    case SORT_FILTER_POKEMONS:
      return {
        ...state,
        sFPokemons: action.payload,
        errorSFPokemons: null
      }
    case SORT_FILTER_POKEMONS_FAILURE:
      return {
        ...state,
        errorSFPokemons: action.payload
      }
    case ORDER_STATE:
      return {
        ...state,
        orderState: action.payload,
        errorOrderState: null
      } 
    case ORDER_STATE_FAILURE:
      return {
        ...state,
        errorOrderState: action.payload
      }        
    case FILTER_STATE:
      return {
        ...state,
        filteState: action.payload,
        errorFilteState: null
      } 
    case FILTER_STATE_FAILURE:
      return {
        ...state,
        errorFilteState: action.payload
      }           
    default:
      return state
  }
}

export default reducer
