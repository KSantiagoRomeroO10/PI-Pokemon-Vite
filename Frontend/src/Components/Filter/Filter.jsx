import './Filter.css'

import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { filterStateAction, filterStateFailure, typeAction } from '../../redux/actions'

const Filter = () => {

  const dispatch = useDispatch()
    
  const [selectedType, setSelectedType] = useState('')

  const [hoverTitleF, setHoverTitleF] = useState(false)
  const [hoverButtonsF, setHoverButtonsF] = useState(false)

  const handleOptionsF = (state) => {
    setHoverTitleF(state)
    setHoverButtonsF(state)
  }

  const handleTypeChange = (event) => {
    const typePoke = event.target.value
    setSelectedType(typePoke)
    handleCardsState('TY')
    dispatch(typeAction(typePoke))
  }

  const handleCardsState = (letter) => {
    try {
      dispatch(filterStateAction(letter))         
    } 
    catch (error) {
      dispatch(filterStateFailure(error.message))
    }
  }

  return (
    <div className='filterButtons'>
      <p onMouseEnter={() => handleOptionsF(true)} onMouseLeave={() => handleOptionsF(false)}>Filters Pokemons</p>
      <div  className={`optionsF ${hoverTitleF === true && hoverButtonsF === true ? 'activeF' : ''}`} 
            onMouseEnter={() => handleOptionsF(true)} 
            onMouseLeave={() => handleOptionsF(false)}
      >

        <button onClick={() => handleCardsState('AP') }>Api</button>
        <button onClick={() => handleCardsState('DB') }>Database</button>
        
        <label htmlFor="originFilter">Filter by type:</label>
        <select id="originFilter" className='originFilter' onChange={handleTypeChange} value={selectedType}>
          <option value="all">All types</option>
          <option value="bug">Bug</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="electric">Electric</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="ghost">Ghost</option>
          <option value="grass">Grass</option>
          <option value="ground">Ground</option>
          <option value="ice">Ice</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="shadown">Shadown</option>
          <option value="steel">Steel</option>
          <option value="unknown">Unknown</option>
          <option value="water">Water</option>
        </select>

        {/* <button onClick={}>Aceptar</button> */}

      </div>
    </div>
  )

}

export default Filter
