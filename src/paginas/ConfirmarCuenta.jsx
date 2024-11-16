import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';//Lo utilizamos para leer los parametros de una URL
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
      const confirmarCuenta = async () => {
        try {
          const url = `/veterinarios/confirmar/${id}`
          const { data } = await clienteAxios(url)//data es la respuesta que siempre da axios
          setCuentaConfirmada(true)
          console.log(data.msg);
          setAlerta({
            msg: data.msg
          });
          
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }

        setCargando(false)
      }

      confirmarCuenta()
  },[])//El useEffect lo usamos para que la respuesta sea automatica apenas cargue la pagina y el usuario quede confirmado

    return (
      <>
          <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
              {!cargando && 
                <Alerta
                  alerta={alerta}
                />
              }     

              {cuentaConfirmada && (
                  <Link 
                  className='block text-center my-5 text-gray-500'
                  to="/">Iniciar Sesion</Link>
              )}
            </div>
      </>
    )
}
  
export default ConfirmarCuenta