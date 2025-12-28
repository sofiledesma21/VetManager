import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserRole(session.user.id)
          setUser(session.user)
        } else {
          setUser(null)
          setUserRole(null)
        }
        setLoading(false)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await fetchUserRole(user.id)
        setUser(user)
      }
    } catch (error) {
      console.error('Error al verificar usuario:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserRole = async (userId) => {
    try {
      // Timeout de 15 segundos (silencioso, sin logs)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 15000)
      )
      
      const queryPromise = supabase
        .from('usuarios')
        .select('rol, nombre, apellido')
        .eq('id', userId)
        .single()
      
      const { data, error } = await Promise.race([queryPromise, timeoutPromise])

      if (error) throw error
      setUserRole(data)
    } catch (error) {
      // Si es timeout, simplemente no hacer nada (el usuario verá su email pero no el rol)
      if (error.message !== 'timeout') {
        console.error('Error al obtener rol:', error)
      }
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setUserRole(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}