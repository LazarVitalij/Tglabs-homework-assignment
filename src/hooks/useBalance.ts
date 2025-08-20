import { useLocalStorage } from '@uidotdev/usehooks'

export const useBalance = (): [() => number, (balance: number) => void] => {
  const [balance, setBalance] = useLocalStorage('balance', '0')
  const getBalance = (): number => {
    return balance ? parseInt(balance, 10) : 0
  }

  const assignBalance = (balance: number): void => {
    setBalance(balance.toString())
  }

  return [getBalance, assignBalance]
}
