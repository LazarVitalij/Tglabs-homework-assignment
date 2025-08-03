import { ReactElement } from 'react'
import styled from 'styled-components'

const Message = styled.span`
  color: var(--error-color);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 5px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`
interface ErrorProps {
  text: string
  className?: string
}

const Error = ({ text, className }: ErrorProps): ReactElement => {
  return <Message className={className}>{text}</Message>
}

export default Error
