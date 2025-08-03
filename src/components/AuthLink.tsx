import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationLink = styled(Link)`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  color: ${({ theme }): string => theme.primary};
`

const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }): string => theme.text};
`
interface AuthLinkProps {
  text: string
  link: string
  linkText: string
}

const AuthLink = ({ text, link, linkText }: AuthLinkProps): ReactElement => {
  return (
    <Paragraph>
      {text}
      <NavigationLink to={link}>{linkText}</NavigationLink>
    </Paragraph>
  )
}

export default AuthLink
