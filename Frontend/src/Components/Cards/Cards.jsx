import './Cards.css'

import { useState, useEffect } from 'react';

import Card from './Card/Card'

import { fetchAllPokemons, sortPokemonsFun, filterOriginFun, sortFilterAction } from '../../redux/actions'

import { connect, useSelector, useDispatch } from 'react-redux'

const Cards = ({fetchAllPokemons}) => {

  const pokemons = useSelector((state) => state.pokemons)
  const errorPokemons = useSelector((state) => state.errorPokemons)
  const sFPokemons = useSelector((state) => state.sFPokemons)

  const filterState = useSelector((state) => state.filterState)
  const orderState = useSelector((state) => state.orderState)
  // const errorOrderState = useSelector((state) => state.errorOrderState)
  const typeValue = useSelector((state) => state.typeValue)
  // const errorFilterState = useSelector((state) => state.errorFilterState)
  
  const dispatch = useDispatch()

  useEffect(() => {

    fetchAllPokemons()

    let filteredPokemons

    if(filterState === 'AP') filteredPokemons = filterOriginFun(pokemons, 'Api')
    if(filterState === 'DB') filteredPokemons = filterOriginFun(pokemons, 'DB')
    if(filterState === 'TY') filteredPokemons = filterOriginFun(pokemons, null, typeValue)
    if(!filterState) filteredPokemons = null

    let filterAndOrder
    if(filteredPokemons){
      if(orderState === 'NA') filterAndOrder = sortPokemonsFun(filteredPokemons, 'nombre', 'asc')
      if(orderState === 'ND') filterAndOrder = sortPokemonsFun(filteredPokemons, 'nombre', 'des')
      if(orderState === 'AA') filterAndOrder = sortPokemonsFun(filteredPokemons, 'ataque', 'asc')
      if(orderState === 'AD') filterAndOrder = sortPokemonsFun(filteredPokemons, 'ataque', 'des')
      if(!orderState) filterAndOrder = filteredPokemons
    }
    else if(!filteredPokemons){
      if(orderState === 'NA') filterAndOrder = sortPokemonsFun(pokemons, 'nombre', 'asc')
      if(orderState === 'ND') filterAndOrder = sortPokemonsFun(pokemons, 'nombre', 'des')
      if(orderState === 'AA') filterAndOrder = sortPokemonsFun(pokemons, 'ataque', 'asc')
      if(orderState === 'AD') filterAndOrder = sortPokemonsFun(pokemons, 'ataque', 'des')
      if(!orderState) filterAndOrder = pokemons
    }

    dispatch(sortFilterAction(filterAndOrder))

  }, [fetchAllPokemons, filterState, orderState, typeValue])

  let pokemonsCards
  if(Array.isArray(sFPokemons)){
    pokemonsCards = sFPokemons.length > 0 ? sFPokemons : pokemons
  }
  else pokemonsCards = pokemons

  const [currentPage, setCurrentPage] = useState(0)

  const tamaño = 12
  let inicio = 0
  let fin = tamaño

  const sections = []

  while (inicio < pokemonsCards.length) {
    let aux0 = pokemonsCards.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: ')
    let aux1 = aux0.slice(inicio, fin)
    sections.push(aux1)
    inicio += tamaño
    fin += tamaño
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (errorPokemons) return <div>Error: {errorPokemons}</div>

  return (
    <div className='cards'>    
      <div className='content'>
        {        
          sections && sections.map((section, index) => {
            const currentCards = []

            for (let i = 0; i < section.length; i++) {
   
              currentCards.push(
                <Card
                  key={section[i].id}
                  id={section[i].id}
                  nombre={section[i].nombre}
                  imagen={section[i].imagen}
                  types={section[i].types}
                />
              )
            }
            return(
              <div key={index} className={`page ${index === currentPage ? 'active' : ''}`}>
                {currentCards}
              </div>
            )        
          })
        }
      </div>
      <div className='pagination'>
        {
          sections && sections.map((section, index) => (
            <button
              key={index}
              className={`page-button ${index === currentPage ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              {index+1}
            </button>
          ))
        }
      </div>
    </div>
  )
}

// const mapStateToProps = state => ({})

const mapDispatchToProps = {
  fetchAllPokemons
}

const ConnCardsWithRedux = connect(null, mapDispatchToProps)(Cards)
export default ConnCardsWithRedux