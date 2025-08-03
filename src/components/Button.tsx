import { ReactElement } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: ${({ theme }): string => theme.text};
  font-size: 1rem;
  border: 1px groove ${({ theme }): string => theme.text};
  border-radius: var(--border-radius);
  background: transparent;
  filter: ${(props): string => (props.disabled ? 'opacity(0.1)' : 'none')};
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  cursor: pointer;

  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    color: ${(props): string =>
      props.disabled ? props.theme.text : props.theme.primary};
  }
`
interface ButtonProps {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  text,
  onClick,
  className,
  disabled,
  type = 'button',
  ...buttonProps
}: ButtonProps): ReactElement => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...buttonProps}
    >
      {text}
    </StyledButton>
  )
}

export default Button
