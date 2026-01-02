import { useParams } from 'react-router-dom'

function Turnos() {
  const { id } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📋 Gestión de Turnos</h1>
      {id ? (
        <p className="text-gray-600">Viendo turno ID: {id}</p>
      ) : (
        <p className="text-gray-600">Lista de todos los turnos</p>
      )}
      <p className="text-sm text-gray-500 mt-2">(Solo Admin y Recepcionista)</p>
    </div>
  )
}

export default Turnos