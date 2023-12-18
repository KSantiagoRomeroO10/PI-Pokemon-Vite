import './NavBar.css'

import { NavLink } from 'react-router-dom'

import SearchName from './SearchName/SearchName'
import ButtonCreate from './ButtonCreate/ButtonCreate'

const Navbar = ({ requestByName, requestAllPokemon }) => {

  const handleNavLinkClick = () => {
    requestAllPokemon()
  }

  return (
    <header className='navBar'>
        <NavLink to={`/home`} className='navLink' onClick={handleNavLinkClick}>
          <h1 className='name'>Pokemon</h1>
        </NavLink>
        <ButtonCreate/>
        <SearchName requestByName={requestByName}/>
    </header>
  )
  
}

export default Navbar