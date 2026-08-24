import './App.css'
import SenaHeader from './components/SenaHeader/SenaHeader'
import Inventario from './components/inventario/inventario'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <SenaHeader />
      
      <main>
        <Routes>
          <Route path="/inventario" element={<Inventario />} />
          
        </Routes>
      </main>
    </>
  )
}

export default App