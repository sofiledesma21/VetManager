import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, userRole, loading } = useAuth()

  // Mientras carga, mostrar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando...</p>
      </div>
    )
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si se especificaron roles permitidos, verificar
  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole.rol)) {
      // Usuario no tiene permiso, redirigir a dashboard
      return <Navigate to="/dashboard" replace />
    }
  }

  // Usuario autenticado y con permiso, mostrar contenido
  return children
}

export default ProtectedRoute