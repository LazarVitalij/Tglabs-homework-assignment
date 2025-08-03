import { ReactElement } from 'react'
import styled from 'styled-components'
import LogoIcon from '@/assets/logo.svg'

const Container = styled.div`
  height: 50px;
  width: 100vw;
  display: flex;
  background: var(--transparent-background);
  justify-content: center;
  align-items: center;
  box-shadow: var(--box-shadow);
  gap: 10px;
  position: static;
`

const Logo = styled.img`
  height: 25px;
`

const Heading = styled.h5`
  text-transform: uppercase;
  font-weight: 300;
  color: ${({ theme }): string => theme.primary};
`

const Footer = (): ReactElement => {
  const date = new Date().getFullYear()
  return (
    <Container>
      <Heading>{`©  ${date}  Doge Bet`}</Heading>
      <Logo src={LogoIcon} />
    </Container>
  )
}

export default Footer
