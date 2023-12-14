import './landing.css'

import { NavLink } from 'react-router-dom'

const Landing = () => {
    return (
      <div className="Landing">
        <h1>Bienvenidos al PI Pokemon- Santiago Romero.</h1>
        <br/>
        <p>
          Proyecto individual enfocado en la construcción de una single page application(SPA) gracias a tecnologías como Node.js, React.js y se realizan pruebas al código con el fin de garantizar la buena funcionalidad de la SPA.
        </p>
        <br/>
        <NavLink to="/home" className='button'>Home Page</NavLink>
      </div>
    )
}

export default Landing