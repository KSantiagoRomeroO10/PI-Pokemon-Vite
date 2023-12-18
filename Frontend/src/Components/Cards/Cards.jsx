import './Cards.css'

import { useState } from 'react'

import Card from './Card/Card'

const Cards = ({ pokemon,  }) => {

  const [currentPage, setCurrentPage] = useState(0)

  const tamaño = 12
  let inicio = 0
  let fin = tamaño

  const sections = []

  while (inicio < pokemon.length) {
    let aux = pokemon.slice(inicio, fin)
    sections.push(aux)
    inicio += tamaño
    fin += tamaño
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='cards'>    
      <div className='content'>
        {        
          sections && sections.map((section, index) => {
            const currentCards = []

            for (let i = 0; i < section.length; i++) {

              console.log(section);
   
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

export default Cards
