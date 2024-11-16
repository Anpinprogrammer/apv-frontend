import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)/**Usamos este state para poder dar indicaciones una vez el objeto haya terminado de cargar */
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            
            //No existe token
            if(!token) {
                setCargando(false)
                return
            }

            //Existe token
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])/*Usamos este useEffect para que compruebe si el usuario esta autenticado cuando la pagina cargue */

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');
            
        //No existe token
        if(!token) {
            setCargando(false)
            return
        }

        //Existe token
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            
            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        console.log(datos)

        const token = localStorage.getItem('token');
            
        //No existe token
        if(!token) {
            setCargando(false)
            return
        }

        //Existe token
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}/**Los values los ponemos para decirle que valores tendra a dispocision para usar */
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext