import './Cards.css'

import { useState, useEffect } from 'react';

import Card from './Card/Card'

import { connect } from 'react-redux'
import { fetchAllPokemons } from '../../redux/actions'

import { useSelector } from 'react-redux'

const Cards = ({ fetchAllPokemons }) => {

  const pokemons = useSelector((state) => state.pokemons)
  const errorPokemons = useSelector((state) => state.errorPokemons)
  const sFPokemons = useSelector((state) => state.sFPokemons)
  
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

  useEffect(() => {
    fetchAllPokemons()
  }, [fetchAllPokemons])

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

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  errorPokemons: state.errorPokemons
})

const mapDispatchToProps = {
  fetchAllPokemons
}

const ConnCardsWithRedux = connect(mapStateToProps, mapDispatchToProps)(Cards)
export default ConnCardsWithRedux