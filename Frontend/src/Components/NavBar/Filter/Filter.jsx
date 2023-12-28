import './Filter.css'

import { useState } from 'react'

import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { sortFilterAction, sortFilterFailure, sortPokemonsFun, filterOriginFun, filterStateAction, filterStateFailure } from '../../../redux/actions'

const Filter = () => {

  const pokemons = useSelector((state) => state.pokemons)
  const sFPokemons = useSelector((state) => state.sFPokemons)

  const orderState = useSelector((state) => state.orderState)
  //const filterState = useSelector((state) => state.filterState)

  const dispatch = useDispatch()
    
  const [selectedType, setSelectedType] = useState('')
  const [hoverTitleF, setHoverTitleF] = useState(false)
  const [hoverButtonsF, setHoverButtonsF] = useState(false)

  const origin = (originType, type = null) => {
    try {
      const filterPokemons = filterOriginFun(originType, pokemons)
      // let sortPokemons
      // if(orderState === 'NA') sortPokemons = sortPokemonsFun(filterPokemons, 'nombre', 'asc')
      // if(orderState === 'ND') sortPokemons = sortPokemonsFun(filterPokemons, 'nombre', 'desc')
      // if(orderState === 'AA') sortPokemons = sortPokemonsFun(filterPokemons, 'ataque', 'asc')
      // if(orderState === 'AD') sortPokemons = sortPokemonsFun(filterPokemons, 'ataque', 'desc')
      // else sortPokemons = filterPokemons
    
      dispatch(sortFilterAction(filterPokemons))

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
      dispatch(sortFilterFailure(error.message))
    }
  }

  const handleTypeChange = (event) => {
    const typePoke = event.target.value
    setSelectedType(typePoke)
  }

  const handleOptionsF = (state) => {
    setHoverTitleF(state)
    setHoverButtonsF(state)
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

        <button onClick={() => { origin('Api'); handleCardsState('AP') }}>Api</button>
        <button onClick={() => { origin('DataBase'); handleCardsState('DB') }}>Database</button>
        
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

        <button onClick={() => { origin('Type', selectedType); handleCardsState('TY') }}>Aceptar</button>

      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  filterOrigin: state.filterOrigin,
  errorFilterOrigin: state.errorFilterOrigin
})

//const mapDispatchToProps = {}

const ConnCardsWithRedux = connect(mapStateToProps, null)(Filter)
export default ConnCardsWithRedux