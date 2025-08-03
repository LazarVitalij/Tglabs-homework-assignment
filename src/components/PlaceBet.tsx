import { ReactElement, useState } from 'react'
import { handleError } from '@/helpers/utils'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Error from '@/components/Error'
import styled from 'styled-components'
import LogoIcon from '../assets/logo.svg'
import Delete from '../assets/delete.png'

const BetContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }): string => theme.background};
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  flex-wrap: wrap-reverse;
  justify-content: center;
  margin-top: 80px;

  @media (max-width: 900px) {
    margin-top: 78px;
    margin-bottom: 6px;
    font-size: 1rem;
    padding: 10px;
    width: 88vw;
  }
`

const BetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: var(--border-radius);

  @media (max-width: 900px) {
    padding: 1.5rem 0rem;
  }
`

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  min-width: 620px;
  border-radius: var(--border-radius);

  @media (max-width: 900px) {
    padding: 1.5rem 0rem;
    min-width: 0;
  }
`

const Title = styled.h3`
  color: ${({ theme }): string => theme.primary};
  text-transform: uppercase;
  text-align: center;
`
const AmountControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 900px) {
    gap: 0.5rem;
  }
`

const AmountButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.275rem 0.55rem;
`

const ResultsLogo = styled.img`
  height: 200px;
  width: auto;
`

const Logo = styled.img`
  height: 100px;
  width: auto;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: start;
`

const StyledParagraph = styled.p`
  color: ${({ theme }): string => theme.text};
`

const NavigationLogo = styled.img`
  height: 40px;
`

const ResetAmountButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

interface PlaceBetProps {
  onPlaceBet: (amount: number) => Promise<void>
  minAmount?: number
  maxAmount?: number
  balance?: number
}

const PlaceBet = ({
  onPlaceBet,
  minAmount = 1,
  maxAmount = 1000,
  balance = 0,
}: PlaceBetProps): ReactElement => {
  const [amount, setAmount] = useState<number>(minAmount)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAmountChange = (value: number): void => {
    const newAmount = Math.max(minAmount, Math.min(maxAmount, value))
    setAmount(newAmount)
  }

  const handleIncrement = (increment: number): void => {
    handleAmountChange(amount + increment)
  }

  const insufficientBalance = amount > balance

  const handleSubmit = async (): Promise<void> => {
    if (amount > balance) return
    setIsSubmitting(true)
    try {
      await onPlaceBet(Number(amount.toFixed(2)))
      setAmount(minAmount)
      setError(null)
    } catch (e) {
      handleError(e, setError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BetContainer>
      <BetsWrapper>
        <Title>Place Your Bet </Title>
        <InfoWrapper>
          <Logo src={LogoIcon} alt="" />
          <StyledParagraph>
            Available Balance: {balance.toFixed(2)}
          </StyledParagraph>
        </InfoWrapper>

        <Input
          type="number"
          value={amount.toFixed(2)}
          min={minAmount}
          max={maxAmount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
        <AmountControls>
          <AmountButton
            onClick={() => handleIncrement(0.1)}
            disabled={amount >= maxAmount}
            text="+0.1"
          />
          <AmountButton
            onClick={() => handleIncrement(0.5)}
            disabled={amount >= maxAmount}
            text="+0.5"
          />
          <AmountButton
            onClick={() => handleIncrement(1)}
            disabled={amount >= maxAmount}
            text="+1"
          />

          <AmountButton
            onClick={() => handleIncrement(10)}
            disabled={amount >= maxAmount}
            text="+10"
          />
          <AmountButton
            onClick={() => handleIncrement(20)}
            disabled={amount >= maxAmount}
            text="+20"
          />
          <AmountButton
            onClick={() => handleIncrement(50)}
            disabled={amount >= maxAmount}
            text="+50"
          />
          <ResetAmountButton onClick={() => handleAmountChange(minAmount)}>
            <NavigationLogo src={Delete} />
          </ResetAmountButton>
        </AmountControls>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || amount > balance || amount < minAmount}
          text={
            isSubmitting ? 'Placing Bet...' : `Place Bet (${amount.toFixed(2)})`
          }
        />
        {error && <Error text={error} />}

        {insufficientBalance && <Error text="Insufficient balance" />}
      </BetsWrapper>
      <ResultsWrapper>
        <Title>Results </Title>
        <ResultsLogo src={LogoIcon} alt="" />
      </ResultsWrapper>
    </BetContainer>
  )
}

export default PlaceBet
