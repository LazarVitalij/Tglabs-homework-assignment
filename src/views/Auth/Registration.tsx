import { ReactElement, useState, FormEvent } from 'react'
import { handleError } from '@/helpers/utils'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Error from '@/components/Error'
import AuthLink from '@/components/AuthLink'
import { validateRegistration, Form } from '@/helpers/validations'
import AuthLayout from '@/components/AuthLayout'
import { RegistrationDetails } from '@/types/auth'
import { registerUser } from '@/services/auth'
import styled from 'styled-components'

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

const Registration = (): ReactElement => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Form>()
  //  I'm leaving this user for easy registration and login.
  const [form, setForm] = useState<RegistrationDetails>({
    name: 'test',
    email: 'test@gmail.com',
    password: '123123',
    confirmPassword: '123123',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const register = async (
    registrationDetails: RegistrationDetails
  ): Promise<void> => {
    try {
      await registerUser(registrationDetails)
      navigate('/login')
      setError(null)
    } catch (e) {
      handleError(e, setError)
    }
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (validateRegistration(form, setErrors)) {
      register(form)
    }
  }

  return (
    <>
      <AuthLayout>
        <StyledForm onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="name"
              error={errors?.name}
            />
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
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="password"
              error={errors?.confirmPassword}
            />
          </InputWrapper>
          {error && <Error text={error} />}
          <Button type="submit" text={'create'} />
        </StyledForm>

        <AuthLink
          text="Already have an account "
          link="/login"
          linkText="Login here"
        />
      </AuthLayout>
    </>
  )
}

export default Registration
