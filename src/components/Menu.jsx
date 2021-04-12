import { Button } from 'bootstrap'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebaseconfig'

const Menu = () => {

    const [usuario, setUsuario] = useState(null)

    useEffect( () => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setUsuario(user.email)
            }
        })
    }, [])

    const cerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
    }

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Inicio</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/login'>Login</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/admin'>Admin</Link>
                    </li>
                </ul>
                {
                    usuario ? 
                    (
                        <button
                            onClick={cerrarSesion} 
                            className='btn btn-danger'>
                                Cerrar Sesión
                        </button>)
                    : 
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default Menu
