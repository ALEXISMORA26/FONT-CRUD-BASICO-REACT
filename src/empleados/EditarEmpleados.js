import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarEmpleados() {

    const urlBase = "http://localhost:8081/rh-app/empleados";

    let navegacion = useNavigate();

    const {id} = useParams(); 
    
    const [empleado, setEmpleado] = useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const {nombre,departamento,sueldo} = empleado

    //se utiliza para procesar alg cuando mse carga ese componente
    useEffect(() =>{
        cargarEmpleado();
    }, [])

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`)
        setEmpleado(resultado.data);
    }

    const onInputChange = (e) => {
        // spreed  operador ...
        setEmpleado({...empleado,[e.target.name]:e.target.value })
    }

    const onSubmint = async (e) => {
        // para evitar que los parametros se pongan en el url
        e.preventDefault()

        await axios.put(`${urlBase}/${id}`,empleado);
        navegacion('/');

    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Editar Empleado</h3>
        </div>
        <form  onSubmit={(e) => onSubmint(e)} >
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name='nombre' required={true} 
                onChange={(e)=>onInputChange(e)} value={nombre}/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="departamento" className="form-label">Departamento</label>
                <input type="text" className="form-control" id="departamento" name='departamento' 
                onChange={(e)=>onInputChange(e)} value={departamento}/>
            </div>
            <div className="mb-3">
                <label htmlFor="sueldo" className="form-label">Sueldo</label>
                <input type="number" step="any" className="form-control" id="sueldo" name='sueldo' 
                onChange={(e)=>onInputChange(e)} value={sueldo}/>
            </div>
            <div className='text-center'>
            <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
            <a href='/' className='btn btn-danger btn-sm' >Regresar</a>
            </div>
        </form>
    </div>
  )
}
