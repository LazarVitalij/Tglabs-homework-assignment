import { ReactElement } from 'react'
import { createContext, useContext, useState, ReactNode } from 'react'
import { AuthContextInterface, LoginResponse } from '@/types/auth'

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.token ? true : false
  )
  const [token, setToken] = useState<string>(localStorage.token || '')

  const logout = (): void => {
    setIsAuthenticated(false)
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
