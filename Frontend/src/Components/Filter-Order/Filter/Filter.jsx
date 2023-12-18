import './Filter.css'

const Filter = ({pokemon, setPokemon}) => {

  const origin = () => {

  }

  const handleOriginChange = () => {

  }

  return (
    <div className='filterPokemon'>

      <h2>Filters Pokemon</h2>

      <button onClick={() => origin('Api')}>Por Api</button>
      <button onClick={() => origin('DataBase')}>Por Base de datos</button>
      
      <label htmlFor="originFilter">Filter by Origin:</label>
      <select id="originFilter" onChange={handleOriginChange}>
        <option value="">All types</option>
        <option value="water">Water</option>
        <option value="poyson">Poison</option>
      </select>
      <button>Aceptar</button>

    </div>
  )

}

export default Filter
