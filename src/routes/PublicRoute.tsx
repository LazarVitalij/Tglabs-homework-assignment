import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const PublicRoute = (): ReactElement => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoute
