import { useState } from "react"

import Validations from './Validations'

const StatesHandlers = () => {

  const [nombre, setNombre] = useState('')
  const [imagen, setImagen] = useState('')
  const [vida, setVida] = useState('')
  const [ataque, setAtaque] = useState('')
  const [defensa, setDefensa] = useState('')
  const [velocidad, setVelocidad] = useState('')
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [type, setType] = useState('')
  const [arrayTypes, setArrayTypes] = useState([])

  const{
    handleNombreVali, errorNombre, 
    handleImagenVali, errorImagen, 
    handleVidaVali, errorVida, 
    handleAtaqueVali, errorAtaque,
    handleDefensaVali, errorDefensa,
    handleVelocidadVali,errorVelocidad,
    handleAlturaVali, errorAltura,
    handlePesoVali, errorPeso
  } = Validations()

  const handleNombre = (event) => {
    const nombrePoke = event.target.value
    handleNombreVali(nombrePoke)
    setNombre(nombrePoke)
  }
  const handleImagen = (event) => {
    const imagenPoke = event.target.value
    handleImagenVali(imagenPoke)
    setImagen(imagenPoke)
  }
  const handleVida = (event) => {
    const vidaPoke = event.target.value
    handleVidaVali(vidaPoke)
    setVida(vidaPoke)
  }
  const handleAtaque = (event) => {
    const ataquePoke = event.target.value
    handleAtaqueVali(ataquePoke)
    setAtaque(ataquePoke)
  }
  const handleDefensa = (event) => {
    const defensaPoke = event.target.value
    handleDefensaVali(defensaPoke)
    setDefensa(defensaPoke)
  }
  const handleVelocidad = (event) => {
    const velocidadPoke = event.target.value
    handleVelocidadVali(velocidadPoke)
    setVelocidad(velocidadPoke)
  }
  const handleAltura = (event) => {
    const alturaPoke = event.target.value
    handleAlturaVali(alturaPoke)
    setAltura(alturaPoke)
  }
  const handlePeso = (event) => {
    const pesoPoke = event.target.value
    handlePesoVali(pesoPoke)
    setPeso(pesoPoke)
  }
  const handleType = (event, action= 'create', type = '') => {
    const addArrayTypes = arrayTypes
    if(action === 'create'){
      const typeEvent = event.target.value
      if(typeEvent && !addArrayTypes.includes(typeEvent)) {
        addArrayTypes.push(typeEvent)
        setArrayTypes(addArrayTypes)
      }
      setType(typeEvent)
    }
    if(action === 'drop') {
      const dropArrayTypes = addArrayTypes.filter((typeDrop) => typeDrop !== type);
      setArrayTypes(dropArrayTypes)
    }
  }
  const handleArrayTypes = () => {
    setArrayTypes([])
  }
  const reiniciarDatosForm = () => {
    setNombre('')
    setImagen('')
    setVida('')
    setAtaque('')
    setDefensa('')
    setVelocidad('')
    setAltura('')
    setPeso('')
    setType('')
    setArrayTypes([])
  }
  return{
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
  }
}

export default StatesHandlers
