import { ReactElement } from 'react'
import styled from 'styled-components'
import LogoIcon from '../assets/logo.svg'

const Logo = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: spin 2s infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const Loader = (): ReactElement => {
  return <Logo src={LogoIcon} />
}

export default Loader
