import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import axios from 'axios'

import NavBar from './Components/NavBar/NavBar'
import Landing from './Components/Landing/Landing'
import Cards from './Components/Cards/Cards'
import Detail from './Components/Detail/Detail'
import Form from './Components/Form/Form'

function App() {

  const [pokemon, setPokemon] = useState([])
  const location = useLocation()

  // http://localhost:3000/get/pokemon/
  // http://localhost:3000/get/pokemon/:id
  // http://localhost:3000/get/name?name=pikcachu
  // http://localhost:3000/get/types
  // http://localhost:3000/post/pokemon

  const UrlBase = 'http://localhost:3000/get/'
  
  const requestByName = (name) => {

    if(!name){
      window.alert('Porfavor digite un nombre.')
      return
    }

    axios.get(`${UrlBase}name?name=${name}`)
      .then(response => response.data)
      .then((data) => {
        setPokemon(data)
      })

  }

  const requestAllPokemon = () => {
    axios.get(`${UrlBase}pokemon`)
      .then(response => response.data)
      .then((data) => {
        const filteredData = data.filter(pokemon => pokemon !== 'Api: ' && pokemon !== 'Database: ')
        setPokemon(filteredData)
      })
  }

  useEffect(() => {
    requestAllPokemon
  }, [])

  return (
    <>
      {
        location.pathname !== '/' && <NavBar 
          requestByName={requestByName} 
          requestAllPokemon={requestAllPokemon} 
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      }
      <Routes>
        <Route path='/' element={ <Landing/> }/>
        <Route path='/home' element={ <Cards/> }/>
        <Route path='/detail/:id' element={ <Detail/> }/>
        <Route path='/form' element={ <Form/> }/>
      </Routes>
    </>
  )
}

export default App
