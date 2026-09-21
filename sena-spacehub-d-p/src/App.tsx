import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout/MainLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import PrestamosPage from './pages/PrestamosPage/PrestamosPage';

function SpaceHubRoutes() {
  return (
    <Routes>
        {/*Ruta publica. accecible para cualquier persona*/}
      <Route path="/login" element={<LoginPage/>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventario" element={<EquiposPage />} />

          <Route path="prestamos" element={<PrestamosPage />} />

          <Route element={<ProtectedRoute requiredRole="Administrador" />}>
            <Route path="inventario/nuevo" element={<NuevoEquipoPage />} />
            <Route path="inventario/:placaSena" element={<DetalleEquipoPage />} />
          </Route>
        </Route>
      </Route>


    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SpaceHubRoutes />
    </AuthProvider>
  );
}
