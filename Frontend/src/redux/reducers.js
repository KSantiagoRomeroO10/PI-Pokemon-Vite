// reducers.js
import { FETCH_POKEMONS, FETCH_POKEMONS_FAILURE, SORT_FILTER_POKEMONS, SORT_FILTER_POKEMONS_FAILURE, ORDER_STATE, ORDER_STATE_FAILURE, FILTER_STATE, FILTER_STATE_FAILURE, TYPES_ARRAY, TYPES_ARRAY_FAILURE } from './actions'

const initialState = {
  pokemons: [],
  errorPokemons: null,
  sFPokemons: [],
  errorSFPokemons: null,
  orderState: null,
  errorOrderState: null,
  filterState: null,
  errorFilterState: null,
  typeValue: [],
  errorTypeValue: null
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
        filterState: action.payload,
        errorFilterState: null
      } 
    case FILTER_STATE_FAILURE:
      return {
        ...state,
        errorFilterState: action.payload
      }      
    case TYPES_ARRAY:
      return {
        ...state,
        typeValue: action.payload,
        errorTypeValue: null
      }
    case TYPES_ARRAY_FAILURE:
      return {
        ...state,
        errorTypeValue: action.payload
      }
    default:
      return state
  }
}

export default reducer
