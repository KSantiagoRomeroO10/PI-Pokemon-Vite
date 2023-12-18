import './Order.css'

const Order = ({pokemon, setPokemon}) => {

  const sortPokemons = (key, order) => {
    const sortedPokemons = [...pokemon].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1
      }
      else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    setPokemon(sortedPokemons)
  }

  return(
    <div className='orderButtons'>
      <h2>Sort Pokémons</h2>
      <button onClick={() => sortPokemons('nombre', 'asc')}>Sort by Name (Asc)</button>
      <button onClick={() => sortPokemons('nombre', 'desc')}>Sort by Name (Desc)</button>
      <button onClick={() => sortPokemons('ataque', 'asc')}>Sort by Attack (Asc)</button>
      <button onClick={() => sortPokemons('ataque', 'desc')}>Sort by Attack (Desc)</button>
    </div>
  )

}

export default Order
