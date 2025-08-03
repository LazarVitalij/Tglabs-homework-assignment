import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
const Home = lazy(() => import('@/views/Home'))
const Wallet = lazy(() => import('@/views/Wallet'))
const Login = lazy(() => import('@/views/Auth/Login'))
const Registration = lazy(() => import('@/views/Auth/Registration'))

const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/registration', element: <Registration /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/wallet', element: <Wallet /> },
    ],
  },
]

export default routes
