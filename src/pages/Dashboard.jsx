import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { userRole } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
      <p className="text-gray-600">Bienvenido, {userRole?.nombre}</p>
      <p className="text-sm text-gray-500 mt-2">Rol: {userRole?.rol}</p>
    </div>
  )
}

export default Dashboard