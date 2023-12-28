import './Order.css'

import { useState } from 'react'

import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { sortFilterAction, sortFilterFailure, sortPokemonsFun, orderStateAction, orderStateFailure } from '../../../redux/actions'

const Order = () => {

  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons)
  const sFPokemons = useSelector((state) => state.sFPokemons)

  // const orderState = useSelector((state) => state.orderState)
  //const filterState = useSelector((state) => state.filterState)

  const [hoverTitleO, setHoverTitleO] = useState(false)
  const [hoverButtonsO, setHoverButtonsO] = useState(false)

  let pokemonsfinal
  if(Array.isArray(sFPokemons)) pokemonsfinal = sFPokemons.length ? sFPokemons : pokemons
  else pokemonsfinal = pokemons
  
  const handleSortPokemons = (key, order) => {
    try {
      const sortedPokemons = sortPokemonsFun(pokemonsfinal, key, order)
      dispatch(sortFilterAction(sortedPokemons))
    } 
    catch (error) {
      dispatch(sortFilterFailure(error.message))
    }
  }
  
  const handleOptionsO = (state) => {
    setHoverTitleO(state)
    setHoverButtonsO(state)
  }

  const handleCardsState = (letter) => {
    try {
      dispatch(orderStateAction(letter))
    } 
    catch (error) {
      dispatch(orderStateFailure(error.message))
    } 
  }
  
  return(
    <div className='orderButtons'>
      <p onMouseEnter={() => handleOptionsO(true)} onMouseLeave={() => handleOptionsO(false)}>Sort Pokemons</p>
      <div  className={`optionsO ${hoverTitleO === true && hoverButtonsO === true ? 'activeO' : ''}`} 
            onMouseEnter={() => handleOptionsO(true)} 
            onMouseLeave={() => handleOptionsO(false)}
      >
        <button onClick={() => { handleSortPokemons('nombre', 'asc'); handleCardsState('NA') }}>Sort by Name (Asc)</button>
        <button onClick={() => { handleSortPokemons('nombre', 'desc'); handleCardsState('ND') }}>Sort by Name (Desc)</button>
        <button onClick={() => { handleSortPokemons('ataque', 'asc'); handleCardsState('AA') }}>Sort by Attack (Asc)</button>
        <button onClick={() => { handleSortPokemons('ataque', 'desc'); handleCardsState('AD') }}>Sort by Attack (Desc)</button>
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  sortPokemons: state.sortPokemons,
  errorSort: state.errorSort
})

//const mapDispatchToProps = {}

const ConnCardsWithRedux = connect(mapStateToProps, null)(Order)
export default ConnCardsWithRedux