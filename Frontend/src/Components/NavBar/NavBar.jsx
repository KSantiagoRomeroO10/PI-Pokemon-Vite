import './NavBar.css'

import { NavLink, useLocation } from 'react-router-dom'

import SearchName from './SearchName/SearchName'
import ButtonCreate from './ButtonCreate/ButtonCreate'
import Order from '../Order/Order'
import Filter from '../Filter/Filter'

import { useDispatch } from 'react-redux'

import { sortFilterAction, orderStateAction, filterStateAction } from '../../redux/actions'

const Navbar = ({ requestByName }) => {

  const dispatch = useDispatch()
  const location = useLocation()

  const detail = location.pathname.includes('/detail')

  const handleNavLinkClick = () => {
    dispatch(sortFilterAction(null))
    dispatch(orderStateAction(null))
    dispatch(filterStateAction(null))
  }

  return (
    <header className='navBar'>
    <NavLink to={`/home`} className='navLink' onClick={handleNavLinkClick}>
      <h1 className='name'>Home</h1>
      
    </NavLink>
    <ButtonCreate />
    {location.pathname !== '/form' && !detail && (
      <>
        <Order/>
        <Filter/>
      </>
    )}
    <SearchName requestByName={requestByName} />
  </header>

  )
  
}

export default Navbar