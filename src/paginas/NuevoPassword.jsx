import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordCambiado, setPasswordCambiado] = useState(false);

    const params = useParams();
    const { token } = params;


    useEffect(() => {
        //Comprueba token
        const comprobarToken = async () => {
            try {
                const url = `/veterinarios/olvide-password/${token}`;
                await clienteAxios(url);
                setAlerta({
                    msg: 'Ingresa tu contraseña nueva'
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }

        comprobarToken();//Es importante siempre llamar la funcion
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: 'Password debe tener al menos 6 caracteres',
                error: true 
            });
            return;
        }

        //Recibe y manda la contraseña nueva
        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setAlerta({
                msg: data.msg
            })
            setPasswordCambiado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;

  return (
    <>
        <div>
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Contraseña y Administra <span className="text-black">tus Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            { msg && <Alerta
                    alerta={alerta}
            /> }

            { tokenValido && (
              <>
                <form 
                onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                        Nuevo Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu Nuevo Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Guardar Nueva Password"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " 
                    />
                </form>

                {passwordCambiado && (
                    <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">Iniciar Sesion
                    </Link>
                )}
              </>  
            )}
            
        </div>
    </>
  )
}

export default NuevoPassword