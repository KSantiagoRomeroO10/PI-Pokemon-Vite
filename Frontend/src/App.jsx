import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from './Components/NavBar/NavBar'
import Landing from './Components/Landing/Landing'
import Cards from './Components/Cards/Cards'
import Detail from './Components/Detail/Detail'
import Form from './Components/Form/Form'

function App() {

  const location = useLocation()
  
  return (
    <>
      {
        location.pathname !== '/' && <NavBar/>
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
