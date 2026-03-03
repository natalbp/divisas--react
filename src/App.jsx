import { use, useEffect, useState } from 'react'
import './estilos.css'

const App = () => {
const [divisas, setDivisas] = useState([])
const [seleccion, setSeleccion] = useState("")
const[divisaDefinitiva, setDivisaDefinitiva]= useState(null)
const [valorInput, setValorInput] = useState(null)

  useEffect ( () => {
   consultar()
   console.log(divisas) 
},[])

const consultar = async () => {
  let url ="https://co.dolarapi.com/v1/cotizaciones"
  const resultado = await fetch (url)
  const data = await resultado.json()
  console.log(data)
  setDivisas(data)
}

const cambioDivisa = (idDivisa) => {
  console.log("Divisa seleccionada ", idDivisa)
  setSeleccion(idDivisa)
  setDivisaDefinitiva(buscarDivisa(idDivisa))
  console.log("Divisa encontrada ", divisa)
}

const buscarDivisa= (idDivisa) => {
  let divisaEncontrada = divisas.find( divisa => divisa.moneda === idDivisa)
  return divisaEncontrada
}

const cambioInput = (nuevoValor) => {
  
}

  return (

    <div className="contenedor">
        <h1>Convertir desde COP</h1>
        <input value={valorInput} type="number" id="valor" placeholder="Cantidad en pesos (COP)"
        onChange={ (evento) => cambioInput(evento.target.value)}/>
        
        <select id="opcionesDivisas" 
        onChange={ (evento) => cambioDivisa(evento.target.value)}>
            <option value="">Cargando divisas...</option>
            { divisas &&
              divisas.map( divisa => (
                <option value={divisa.moneda}>{divisa.nombre}</option>
              ))
            }
        </select>

        {/*<button>Convertir</button>*/}
        <p id="resultado">
           {valorInput / divisaDefinitiva?.ultimoCierre}
        </p>
    </div>
  )


}
export default App
  