import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Páginas
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Calendario from './pages/Calendario'
import Perfil from './pages/Perfil'
import Turnos from './pages/Turnos'
import NotFound from './pages/NotFound'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando aplicación...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendario"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Recepcionista']}>
              <Calendario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turnos"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Recepcionista']}>
              <Turnos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turnos/:id"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Recepcionista']}>
              <Turnos />
            </ProtectedRoute>
          }
        />

        {/* Redirección inicial */}
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
