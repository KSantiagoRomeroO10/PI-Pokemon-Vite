import './Form.css'

import StatesHandlers from './StatesHandlers'
import { useState } from 'react'

import axios from 'axios'

const Form = () => {

  const [registro, setRegistro] = useState('')
  const [messageErrorArray, setMessageErrorArray] = useState('')

  const { 
    nombre, handleNombre, errorNombre,
    imagen, handleImagen, errorImagen,
    vida, handleVida, errorVida,
    ataque, handleAtaque, errorAtaque,
    defensa, handleDefensa, errorDefensa,
    velocidad, handleVelocidad, errorVelocidad,
    altura, handleAltura, errorAltura,
    peso, handlePeso, errorPeso,
    type, handleType, 
    arrayTypes, handleArrayTypes,
    reiniciarDatosForm
  } = StatesHandlers()
 
  let activeButton = false

  const datesExist = nombre && imagen && vida && ataque && defensa && velocidad && altura && peso && arrayTypes.length > 0
  const errorsExist = errorNombre || errorImagen || errorVida || errorAtaque || errorDefensa || errorVelocidad || errorAltura || errorPeso

  if(datesExist && !errorsExist) activeButton = true
  else activeButton = false

  const handleButtonCreate = async() => {

    if(datesExist && !errorsExist){      
      const newPokemon = {
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        type: arrayTypes
      }
      try {
        const response = await axios.post('http://localhost:3000/post/pokemon', newPokemon)
        if(response) setRegistro('Succesfully pokemon')
        reiniciarDatosForm()
        setTimeout(() => {
          setMessageErrorArray('')
          setRegistro('')
        }, 2500)
      }
      catch (error) {
        console.log(error)
      }
    }
    else{
      if(arrayTypes.length === 0){
        setMessageErrorArray('Debe escoger al menos 1 tipo.')
      }
    }
  }

  return (
    <div className='form'>
      <h1 className='tittle'>Create new pokemon</h1>
      <div className="left">        
        <input type="text" placeholder='Nombre' onChange={handleNombre} value={nombre}/>
        {errorNombre && <p className='errorForm'>{errorNombre}</p>}
        <br />
        <input type="text" placeholder='Imagen' onChange={handleImagen} value={imagen}/>
        {errorImagen && <p className='errorForm'>{errorImagen}</p>}
        <br />
        <input type="text" placeholder='Vida' onChange={handleVida} value={vida}/>
        {errorVida && <p className='errorForm'>{errorVida}</p>}
        <br />
        <input type="text" placeholder='Ataque' onChange={handleAtaque} value={ataque}/>
        {errorAtaque && <p className='errorForm'>{errorAtaque}</p>}
        <br />
        <input type="text" placeholder='Defensa' onChange={handleDefensa} value={defensa}/>
        {errorDefensa && <p className='errorForm'>{errorDefensa}</p>}
      </div>
      <div className="right">
        <input type="text" placeholder='Velocidad' onChange={handleVelocidad} value={velocidad}/>  {/* si tiene */}
        {errorVelocidad && <p className='errorForm'>{errorVelocidad}</p>}
        <br />
        <input type="text" placeholder='Altura' onChange={handleAltura} value={altura}/>    {/* si tiene */}
        {errorAltura && <p className='errorForm'>{errorAltura}</p>}
        <br />
        <input type="text" placeholder='Peso' onChange={handlePeso} value={peso}/>       {/* si tiene */}
        {errorPeso && <p className='errorForm'>{errorPeso}</p>}
        <br />
        <label htmlFor="typePokemon">Select type:</label>
        <select id="typePokemon" className='typePokemon' onChange={(event) => handleType(event)} value={type}>
          <option value="">Select types</option>
          <option value="bug">Bug</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="electric">Electric</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="ghost">Ghost</option>
          <option value="grass">Grass</option>
          <option value="ground">Ground</option>
          <option value="ice">Ice</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="shadown">Shadown</option>
          <option value="steel">Steel</option>
          <option value="unknown">Unknown</option>
          <option value="water">Water</option>
        </select>
        <br />
        <button className='buttonTypes' onClick={(event) => handleType(event, 'drop', type)}>Drop type</button>
        <button className='buttonTypes' onClick={handleArrayTypes}>Drop all types</button>
        <br />
        <p>
          Types to add:
          {arrayTypes.length > 0 ? (
            arrayTypes.map((selectedType, index) => (
              <span key={index} className='types'> 
                {' '}
                {selectedType} 
                {' '}               
                {index !== arrayTypes.length - 1 && '-'} 
              </span>
            ))
          ) : (
            <span className='nothing'> Nothing</span>
          )}
        </p>
        <br />
        <br />
      </div>
      <button className={`buttonCreateForm ${activeButton ? 'buttonActive' : ''}`} onClick={handleButtonCreate}>
        Create Pokemon
      </button>
      <br />
      {registro && <p className='registrado'>{registro}</p>}
      {messageErrorArray && <p className='registrado'>{messageErrorArray}</p>}
    </div>
  )
}

export default Form

// https://wallpaper.dog/large/10988085.jpg
// https://th.bing.com/th/id/R.c09548bd43504df7391f6c0e9f6ba335?rik=WRL557reFVj5GA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fc%2f8%2fb%2f53805.jpg&ehk=4SeTJX6mnybbcwLLxOdtctqoK3OleuGDRaXee2HQaXc%3d&risl=&pid=ImgRaw&r=0