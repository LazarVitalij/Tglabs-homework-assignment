export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationDetails {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegistrationResponse {
  id: string
  name: string
}

export interface LoginResponse {
  id: string
  name: string
  balance: number
  currency: string
  accessToken: string
}

export interface AuthContextInterface {
  user: LoginResponse | null
  isAuthenticated: boolean
  token: string
  setToken: (token: string) => void
  setIsAuthenticated: (value: boolean) => void
  setUser: (user: LoginResponse) => void
  logout: () => void
}
