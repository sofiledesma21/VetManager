import { useAuth } from './context/AuthContext'

function App() {
  const { user, userRole, loading, signIn, signOut } = useAuth()

  const handleLogin = async () => {
    const { data, error } = await signIn(
      'admin@vetmanager.com',
      'admin123'  // ← Poné la contraseña correcta acá
    )
    if (error) {
      console.error('Error:', error.message)
      alert('Error al iniciar sesión: ' + error.message)
    } else {
      console.log('Login exitoso:', data)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          🐾 VetManager
        </h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-lg mb-2">
                ✅ <strong>Usuario:</strong> {user.email}
              </p>
              <p className="text-lg mb-2">
                🔹 <strong>Rol:</strong> {userRole?.rol}
              </p>
              <p className="text-lg">
                👤 <strong>Nombre:</strong> {userRole?.nombre} {userRole?.apellido}
              </p>
            </div>
            <button 
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-lg">❌ No hay sesión activa</p>
            </div>
            <button 
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition"
            >
              Probar Login (Admin)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
