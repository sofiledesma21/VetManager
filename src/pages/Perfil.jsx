import { useAuth } from '../context/AuthContext'

function Perfil() {
  const { user, userRole } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">👤 Mi Perfil</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
        <p className="mb-2"><strong>Nombre:</strong> {userRole?.nombre} {userRole?.apellido}</p>
        <p><strong>Rol:</strong> {userRole?.rol}</p>
      </div>
    </div>
  )
}

export default Perfil