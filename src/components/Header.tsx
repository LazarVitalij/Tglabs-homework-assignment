import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useBalance } from '@/hooks/useBalance'
import Euro from '@/assets/euro.svg'
import Home from '@/assets/home.png'
import Wallet from '@/assets/wallet.png'
import Logout from '@/assets/logout.png'
import Theme from '@/assets/theme.png'

const Container = styled.div`
  height: 66px;
  width: 100vw;
  display: flex;
  background: var(--transparent-background);
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  position: fixed;
  z-index: 2;
`

const Separation = styled.div`
  display: flex;
  gap: 5px;
`

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CurrencyLogo = styled.img`
  height: 20px;
`
const NavigationLogo = styled.img`
  height: 40px;
`

const NavigationButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`
const Balance = styled.p`
  color: ${({ theme }): string => theme.primary};
`

const Header = (): ReactElement => {
  const [getBalance] = useBalance()
  const { logout } = useAuth()
  const { toggleTheme } = useTheme()

  return (
    <Container>
      <Separation style={{ marginLeft: 10 }}>
        <NavigationButton>
          <Link to="/">
            <NavigationLogo src={Home} />
          </Link>
        </NavigationButton>
        <NavigationButton>
          <Link to="/wallet">
            <NavigationLogo src={Wallet} />
          </Link>
        </NavigationButton>
        <NavigationButton onClick={() => toggleTheme()}>
          <NavigationLogo src={Theme} />
        </NavigationButton>
      </Separation>
      <Separation style={{ marginRight: 15 }}>
        <BalanceWrapper>
          <CurrencyLogo style={{ fill: 'red' }} src={Euro} alt="Logo" />
          <Balance>{getBalance().toFixed(2)}</Balance>
        </BalanceWrapper>
        <NavigationButton onClick={() => logout()}>
          <NavigationLogo src={Logout} />
        </NavigationButton>
      </Separation>
    </Container>
  )
}

export default Header
