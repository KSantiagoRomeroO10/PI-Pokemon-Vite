import './Order.css'

import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { orderStateAction, orderStateFailure } from '../../redux/actions'

const Order = () => {

  const dispatch = useDispatch()

  const [hoverTitleO, setHoverTitleO] = useState(false)
  const [hoverButtonsO, setHoverButtonsO] = useState(false)
  
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
        <button onClick={() => handleCardsState('NA')}>Sort by Name (Asc)</button>
        <button onClick={() => handleCardsState('ND')}>Sort by Name (Desc)</button>
        <button onClick={() => handleCardsState('AA')}>Sort by Attack (Asc)</button>
        <button onClick={() => handleCardsState('AD')}>Sort by Attack (Desc)</button>
        {/* <button onClick={() => { handleSortPokemons('nombre', 'asc'); handleCardsState('NA') }}>Sort by Name (Asc)</button>
        <button onClick={() => { handleSortPokemons('nombre', 'des'); handleCardsState('ND') }}>Sort by Name (Desc)</button>
        <button onClick={() => { handleSortPokemons('ataque', 'asc'); handleCardsState('AA') }}>Sort by Attack (Asc)</button>
        <button onClick={() => { handleSortPokemons('ataque', 'des'); handleCardsState('AD') }}>Sort by Attack (Desc)</button> */}
      </div>
    </div>
  )

}

export default Order
