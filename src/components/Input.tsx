import { ReactElement, InputHTMLAttributes } from 'react'
import Error from '@/components/Error'
import styled from 'styled-components'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const StyledLabel = styled.label`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }): string => theme.text};
`

const StyledInput = styled.input`
  color: ${({ theme }): string => theme.text};
  font-size: 1rem;
  border: 1px groove ${({ theme }): string => theme.text};
  border-radius: var(--border-radius);
  background: transparent;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  outline: none;

  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  @media (max-width: 600px) {
    font-size: 15px;
    padding: 10px;
  }
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = ({
  label,
  error,
  className,
  children,
  ...inputProps
}: InputProps): ReactElement => {
  return (
    <InputContainer className={className}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput {...inputProps} />
      {error && <Error text={error} />}
    </InputContainer>
  )
}

export default Input
