import './NavBar.css'

import { NavLink } from 'react-router-dom'

import SearchName from './SearchName/SearchName'
import ButtonCreate from './ButtonCreate/ButtonCreate'
import Order from './Order/Order'
import Filter from './Filter/Filter'

const Navbar = ({ requestByName, requestAllPokemon, pokemon, setPokemon }) => {

  const handleNavLinkClick = () => {
    requestAllPokemon()
  }

  return (
    <header className='navBar'>
        <NavLink to={`/home`} className='navLink' onClick={handleNavLinkClick}>
          <h1 className='name'>Pokemon</h1>
        </NavLink>
        <ButtonCreate/>
        <Order pokemon={pokemon} setPokemon={setPokemon}/>
        <Filter pokemon={pokemon} setPokemon={setPokemon}/>
        <SearchName requestByName={requestByName}/>
    </header>
  )
  
}

export default Navbar