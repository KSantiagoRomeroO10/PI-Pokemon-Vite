import './ButtonCreate.css'

import { NavLink } from 'react-router-dom'

const ButtonCreate = () => {
  return(
    <NavLink to="/form" className='buttonCreate'>Create new</NavLink>
  )
}

export default ButtonCreate