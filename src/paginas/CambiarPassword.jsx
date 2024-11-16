import { useState } from 'react'
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({pwd_actual : '', pwd_nuevo : ''})

  const handleSubmit = async e => {
    e.preventDefault();
    const { pwd_actual, pwd_nuevo } = password

    //const { pwd_actual, pwd_nuevo } = password
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if( pwd_nuevo.length < 6 ) {
      setAlerta({
        msg: 'La contraseña nueva debe tener al menos 6 caracteres',
        error: true
      })
      return
    }

    if(pwd_actual === pwd_nuevo) {
      setAlerta({
        msg: 'Las contraseñas no pueden ser iguales',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
  }

  const { msg } = alerta
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Contraseña aqui</span> 
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta 
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label 
                            htmlFor=""
                            className="uppercase font-bold text-gray-600"
                        >Contraseña Actual</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            name="pwd_actual"
                            placeholder='Escribe tu contraseña actual'
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label 
                            htmlFor=""
                            className="uppercase font-bold text-gray-600"
                        >Contraseña Nueva</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            name="pwd_nuevo"
                            placeholder='Escribe tu contraseña nueva'
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Actualizar Contraseña"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5" 
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword