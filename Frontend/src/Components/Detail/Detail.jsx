import './Detail.css'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 


const Detail = () =>{

  const UrlBase = 'http://localhost:3000/get/pokemon'

  const [pokemon, setPokemon] = useState({})

  const {id} = useParams()  //objeto con la información de la ruta.

  useEffect(() => {
    axios(`${UrlBase}/${id}`)
    .then(response => response.data)
    .then((data) => {
       if (data) {
          console.log(data)
          setPokemon(data)
       }
       else {
          window.alert('No hay personajes con ese ID')
       }
    })
    return setPokemon({})
  }, [id])
  
  let typesString

  if (pokemon.types && pokemon.types.length) {
    typesString = pokemon.types.join(', ') // Convertir el array en una cadena separada por comas y espacios
  }

  return(
    <div className='container'>
      <div className='divImg'>
        <img src={pokemon.imagen} alt='Error no hay imagen.' className='image'/>
      </div>
      <div className='content'>
        <p><span className='title'>Id:</span> {id}</p>
        <br />
        <p><span className='title'>Nombre:</span> {pokemon?.nombre}</p>
        <br />
        <p><span className='title'>Vida:</span> {pokemon?.vida}</p>
        <br />
        <p><span className='title'>Ataque:</span> {pokemon?.ataque}</p>
        <br />
        <p><span className='title'>Defensa:</span> {pokemon?.defensa}</p>
        <br />
        <p><span className='title'>Velocidad:</span> {pokemon?.velocidad}</p>
        <br />
        <p><span className='title'>Altura:</span> {pokemon?.altura}</p>
        <br />
        <p><span className='title'>Peso:</span> {pokemon?.peso}</p>
        <br />
        <p><span className='tittle'>Tipos:</span> {typesString} </p>
      </div>
    </div>
  )
}

export default Detail