import React, {useState} from 'react'
import {auth} from '../firebaseconfig'


const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgerror, setMsgError] = useState(null);

    const registrarUsuario = (e) =>{
        e.preventDefault()       
        auth.createUserWithEmailAndPassword(email, pass)
            .then ( r => alert('Usuario registrado'))
            .catch (e => {
            if (e.code === 'auth/invalid-email') {
                setMsgError('Formato de Email incorrecto')
            }
            if (e.code === 'auth/weak-password') {
                setMsgError('La contraseña debe tener 6 caracteres o más')
            }
        })
    }

    const loginDeUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
        .then( (r) => console.log(r))
        .catch((err) =>{
            if(err.code === 'auth/wrong-password') {
                setMsgError('La contraseña es incorrecta')
            }
        })
    }

    return (
        <div className='row mt-5'>
            <div className="col"></div>
            <div className="col">
                <form onSubmit={registrarUsuario} className='form-grow'>
                    <input 
                        onChange={(e) => {setEmail(e.target.value)}}
                        className='form-control'
                        placeholder='Introduce el Email'
                        type="email"
                    />
                    <input 
                        onChange={(e) => {setPass(e.target.value)}}
                        className='form-control mt-4'
                        placeholder='Introduce la contraseña'
                        type="password"
                    />
                    <input 
                        className='btn btn-dark btn-block mt-4'
                        value='Registrar Usuario'
                        type="submit"                   
                    />
                </form>
                <button 
                    onClick={loginDeUsuario}
                    className="btn btn-success btn-block mt-4">
                        Iniciar Sesión
                </button>
                {
                    msgerror != null ? 
                    (
                        <div className='alert alert-danger mt-2'>
                            {msgerror}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login
