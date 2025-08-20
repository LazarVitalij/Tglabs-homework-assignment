import { fetchPostApi } from '@/helpers/fetchers'
import {
  LoginCredentials,
  RegistrationDetails,
  LoginResponse,
  RegistrationResponse,
} from '@/types/auth'

export const loginUser = (body: LoginCredentials): Promise<LoginResponse> => {
  return fetchPostApi<LoginResponse, LoginCredentials>('login', body)
}

export const registerUser = (
  body: RegistrationDetails
): Promise<RegistrationResponse> => {
  return fetchPostApi<RegistrationResponse, RegistrationDetails>(
    'register',
    body
  )
}
