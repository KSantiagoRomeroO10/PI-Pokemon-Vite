import './Card.css'

import { NavLink } from 'react-router-dom';

const Card = ({ id, nombre, imagen, types}) => {
  const typesArray = types && Array.isArray(types) ? types.map(type => type): ['Sin tipo']
  const typesJoin = typesArray.join(' ')
  return(
    <NavLink to={`/detail/${id}`} className='navLink'>
      <div className='card'>
        <img src={imagen} alt='Error 404, not found.'/>
        <p className="info">Name: {nombre}</p>
        <p className="info">Types: {typesJoin}</p>
      </div>
    </NavLink>
  )
}

export default Card