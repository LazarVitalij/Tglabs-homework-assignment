import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const PrivateRoute = (): ReactElement => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute
