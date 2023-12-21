import './Order.css'

import { useState } from 'react'

const Order = ({pokemon, setPokemon}) => {

  const [hoverTitleO, setHoverTitleO] = useState(false)
  const [hoverButtonsO, setHoverButtonsO] = useState(false)

  const sortPokemons = (key, order) => {
    const sortedPokemons = [...pokemon].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1
      }
      else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    setPokemon(sortedPokemons)
  }
  
  const handleOptionsO = (state) => {
    setHoverTitleO(state)
    setHoverButtonsO(state)
  }
  
  return(
    <div className='orderButtons'>
      <p onMouseEnter={() => handleOptionsO(true)} onMouseLeave={() => handleOptionsO(false)}>Sort Pokemons</p>
      <div  className={`optionsO ${hoverTitleO === true && hoverButtonsO === true ? 'activeO' : ''}`} 
            onMouseEnter={() => handleOptionsO(true)} 
            onMouseLeave={() => handleOptionsO(false)}
      >
        <button onClick={() => sortPokemons('nombre', 'asc')}>Sort by Name (Asc)</button>
        <button onClick={() => sortPokemons('nombre', 'desc')}>Sort by Name (Desc)</button>
        <button onClick={() => sortPokemons('ataque', 'asc')}>Sort by Attack (Asc)</button>
        <button onClick={() => sortPokemons('ataque', 'desc')}>Sort by Attack (Desc)</button>
      </div>
    </div>
  )

}

export default Order
