import { ReactElement, useState, FormEvent } from 'react'
import { handleError } from '@/helpers/utils'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/Button'
import Input from '@/components/Input'
import AuthLink from '@/components/AuthLink'
import AuthLayout from '@/components/AuthLayout'
import { validateLogin, Form } from '@/helpers/validations'
import styled from 'styled-components'
import Error from '@/components/Error'
import { loginUser } from '@/services/auth'
import { LoginCredentials } from '@/types/auth'

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 12px;
`

const InputWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  gap: 12px;
  flex-direction: column;
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  width: 400px;
  align-items: center;
  gap: 15px;
`

const Login = (): ReactElement => {
  const { setUser, setToken } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Form>()
  //  I'm leaving this user for easy registration and login.
  const [form, setForm] = useState<LoginCredentials>({
    email: 'test@gmail.com',
    password: '123123',
  })

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await loginUser(credentials)
      setUser(response)
      setToken(response.accessToken)
      localStorage.setItem('token', response.accessToken)
      setError(null)
    } catch (e) {
      handleError(e, setError)
      localStorage.clear()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (validateLogin(form, setErrors)) {
      login(form)
    }
  }

  return (
    <AuthLayout>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            error={errors?.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
            error={errors?.password}
          />
        </InputWrapper>
        {error && <Error text={error} />}
        <ButtonWrapper>
          <Button type="submit" text={'Login'} />
        </ButtonWrapper>
      </StyledForm>
      <AuthLink
        text="Don't have an account? "
        link="/registration"
        linkText="Register here"
      />
    </AuthLayout>
  )
}

export default Login
