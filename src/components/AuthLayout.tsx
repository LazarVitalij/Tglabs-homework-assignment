import { ReactNode, ReactElement } from 'react'
import styled from 'styled-components'
import LogoIcon from '@/assets/logo.svg'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  justify-content: space-evenly;
`

const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-top: 20px;
`

const Heading = styled.h1`
  color: ${({ theme }): string => theme.primary};
  text-transform: uppercase;
  font-size: 2rem;
  margin: 0;
`

const ChildrenWrapper = styled.div`
  min-width: 400px;
  min-height: 470px;
  background: ${({ theme }): string => theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-2);
  display: flex;
  gap: 25px;
  align-items: center;
  flex-direction: column;
  padding-bottom: 30px;

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    justify-content: center;
    padding-bottom: 0px;
  }
`
const AuthLayout = ({
  children,
  className = '',
}: LayoutProps): ReactElement => {
  return (
    <Container className={className}>
      <ChildrenWrapper>
        <div>
          <Logo src={LogoIcon} alt="logo Icon" />
          <Heading>Doge Bet</Heading>
        </div>

        {children}
      </ChildrenWrapper>
    </Container>
  )
}

export default AuthLayout
