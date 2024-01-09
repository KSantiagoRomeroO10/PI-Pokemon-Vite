import './NavBar.css'

import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sortFilterAction, orderStateAction, filterStateAction, searchNameAction } from '../../redux/actions'

import SearchName from './SearchName/SearchName'
import ButtonCreate from './ButtonCreate/ButtonCreate'
import Order from '../Order/Order'
import Filter from '../Filter/Filter'

const Navbar = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  const detail = location.pathname.includes('/detail')

  const handleNavLinkClick = () => {
    dispatch(sortFilterAction(null))
    dispatch(orderStateAction(null))
    dispatch(filterStateAction(null))
    dispatch(searchNameAction([]))
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
    <SearchName/>
  </header>

  )
  
}

export default Navbar