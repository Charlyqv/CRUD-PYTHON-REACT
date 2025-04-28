import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { FormularioColaborativo } from './pages/FormularioColaborativo'
import { Navigation } from './components/Navigation'
import { Toaster } from "react-hot-toast"
import { ValidCer } from './pages/ValidCer'
import { FormularioList } from './pages/FormularioList'
import { Home } from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <div className='container mx-auto'>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Navigate to={"/home"}/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/tasks' element={<TasksPage/>} />
          <Route path='/tasks-create' element={<TaskFormPage/>} />
          <Route path='/tasks/:id' element={<TaskFormPage/>} />
          <Route path='/validar-certificados' element={<ValidCer/>} />

          <Route path='/form' element={<FormularioColaborativo/>} />
          <Route path='/lista-certificados' element={<FormularioList/>} />
          
        </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  )
}

export default App