import { fetchPostApi } from '@/helpers/fetchers'
import {
  LoginCredentials,
  RegistrationDetails,
  LoginResponse,
  RegistrationResponse,
} from '@/types/auth'

export const loginUser = async (
  body: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetchPostApi<LoginResponse, LoginCredentials>(
    'login',
    body
  )
  return response
}

export const registerUser = async (
  body: RegistrationDetails
): Promise<RegistrationResponse> => {
  const response = await fetchPostApi<
    RegistrationResponse,
    RegistrationDetails
  >('register', body)
  return response
}
