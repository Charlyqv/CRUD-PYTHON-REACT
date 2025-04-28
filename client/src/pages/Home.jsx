import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>Home
        <ul>
            <li>
                <Link to="/tasks">Task</Link>
            </li>
            <li>
                <Link to="/validar-certificados">Validar Certificados</Link>
            </li>
            <li>
                <Link to="/lista-certificados">Lista Formularios</Link>
            </li>
        </ul>
    </div>
  )
}
