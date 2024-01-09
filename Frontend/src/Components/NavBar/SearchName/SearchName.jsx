import './SearchName.css'

import axios from 'axios'

import { useState } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { searchNameAction, searchNameFailure, sortFilterAction } from '../../../redux/actions'

const SearchName = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const UrlBase = 'http://localhost:3000/get/'
  
  const requestByName = (name) => {

    if(!name){
      window.alert('Porfavor digite un nombre.')
      dispatch(searchNameFailure('Porfavor digite un nombre.'))
      return
    }

    axios.get(`${UrlBase}name?name=${name}`)
      .then(response => response.data)
      .then((data) => {
        dispatch(sortFilterAction([]))
        dispatch(searchNameAction(data))
      })

  }

  return(
    <div className='searchName'>
      <input type="text" onChange={handleChange} value={name} placeholder="Name of pokemon" className="inputRequestName"/>
      <NavLink to={`/home`}>
        <button onClick={() => { requestByName(name); setName('') }} className="buttonRequestName">Search</button>
      </NavLink>
    </div>
  )
}

export default SearchName