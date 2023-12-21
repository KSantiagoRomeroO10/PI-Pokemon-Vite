import './Filter.css'

import { useState } from 'react'
import axios from 'axios'

const Filter = ({setPokemon}) => {

  const [pokemonApiDb, setPokemonApiDb] = useState([])
  const [selectedType, setSelectedType] = useState('')
  
  const [hoverTitleF, setHoverTitleF] = useState(false)
  const [hoverButtonsF, setHoverButtonsF] = useState(false)

  const UrlBase = 'http://localhost:3000/get/'

  const requestAllPokemonApiDb = () => {
    axios.get(`${UrlBase}pokemon`)
      .then(response => response.data)
      .then((data) => {
        setPokemonApiDb(data)
      })
  }

  requestAllPokemonApiDb()

  const origin = (originType) => {

    const pokemonOrigin = []
    let aux = false

    for (let poke of pokemonApiDb) {
      if (originType === 'Api') {
        pokemonOrigin.push(poke)
        if (poke === 'Database: ') break
      }

      if (originType === 'DataBase') {
        if (poke === 'Database: ') aux = true;
        if (aux) pokemonOrigin.push(poke)
      }
    }
    
    setPokemon(pokemonOrigin.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: '))

  }
  const type = (type) => {
    const pokemonTypes = []
    if(selectedType === '') pokemonTypes.push(pokemonApiDb)
    else {
      for(let poke of pokemonApiDb){
        if (poke.types && Array.isArray(poke.types)) {
          poke.types.forEach(pokeType => {
            if(pokeType === type) pokemonTypes.push(poke)
          })
        }
      }
    }
    setPokemon(pokemonTypes)
  }

  const handleTypeChange = (event) => {
    const typePoke = event.target.value
    setSelectedType(typePoke)
    // type(typePoke)
  }

  const handleOptionsF = (state) => {
    setHoverTitleF(state)
    setHoverButtonsF(state)
  }

  return (
    <div className='filterButtons'>
      <p onMouseEnter={() => handleOptionsF(true)} onMouseLeave={() => handleOptionsF(false)}>Filters Pokemons</p>
      <div  className={`optionsF ${hoverTitleF === true && hoverButtonsF === true ? 'activeF' : ''}`} 
            onMouseEnter={() => handleOptionsF(true)} 
            onMouseLeave={() => handleOptionsF(false)}
      >

        <button onClick={() => origin('Api')}>Api</button>
        <button onClick={() => origin('DataBase')}>Database</button>
        
        <label htmlFor="originFilter">Filter by type:</label>
        <select id="originFilter" className='originFilter' onChange={handleTypeChange} value={selectedType}>
          <option value="">All types</option>
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

        <button onClick={() => type(selectedType)}>Aceptar</button>

      </div>
    </div>
  )

}

export default Filter
