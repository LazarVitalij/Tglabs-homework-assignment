import { ReactElement, useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { UserBetsResponse } from '@/types/bets'
import { useBalance } from '@/hooks/useBalance'
import { handleError } from '@/helpers/utils'
import { placeBet, getBets, cancelBet } from '@/services/bets'
import InformationTable from '@/components/InformationTable'
import PlaceBet from '@/components/PlaceBet'
import Cancel from '@/assets/cancel.png'

const Container = styled.div`
  min-height: 96vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
`

const CancelLogo = styled.img`
  height: 40px;

  @media (max-width: 900px) {
    height: 25px;
    padding: 0px;
  }
`

const CancelButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const Home = (): ReactElement => {
  const { user, token } = useAuth()
  const initialBalanceSet = useRef(false)
  const [getBalance, assignBalance] = useBalance()
  const [tableError, setTableError] = useState<string | null>(null)
  const [bets, setBets] = useState<UserBetsResponse | null>(null)

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 1,
  })

  const [filtersState, setFiltersState] = useState({
    status: '',
  })

  const handleFilterChange = (key: string, value: string): void => {
    handlePaginationChange(1)
    setFiltersState((prev) => ({ ...prev, [key]: value }))
  }

  const statusOptions = [
    { value: 'lost', label: 'lost' },
    { value: 'win', label: 'win' },
    { value: 'canceled', label: 'Canceled' },
  ]

  const fetchBets = useCallback(
    async (page: number = 1, filters = filtersState) => {
      try {
        const response = await getBets(
          {
            page,
            limit: pagination.limit,
            status: filters.status || undefined,
          },
          token
        )
        setBets(response)
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(response.total / prev.limit),
        }))
      } catch (error) {
        handleError(error, setTableError)
        setBets(null)
      }
    },
    [token, pagination.limit, filtersState]
  )

  const handlePlaceBet = async (amount: number): Promise<void> => {
    const response = await placeBet({ amount: amount }, token)
    fetchBets()
    assignBalance(response?.balance)
  }

  const handleCancelBet = async (id: string, token: string): Promise<void> => {
    try {
      const response = await cancelBet(id, token)
      assignBalance(response?.balance)
      fetchBets(pagination.page)
    } catch (e) {
      handleError(e, setTableError)
    }
  }

  useEffect(() => {
    fetchBets(pagination.page)
  }, [pagination.page, fetchBets])

  useEffect(() => {
    if (!initialBalanceSet.current && user?.balance) {
      assignBalance(user.balance)
      initialBalanceSet.current = true
    }
  }, [user?.balance, assignBalance])
  const handlePaginationChange = (newPage: number): void => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <Container>
      <InformationTable
        title="Bets"
        data={bets?.data}
        handlePaginationChange={handlePaginationChange}
        pagination={pagination}
        error={tableError}
        onFilterChange={handleFilterChange}
        columns={[
          { key: 'winAmount', header: 'Win Amount' },
          { key: 'status', header: 'Status' },
          { key: 'amount', header: 'Amount' },
          {
            key: 'createdAt',
            header: 'Date',
            render: (row) => new Date(row?.createdAt).toLocaleString(),
          },
          {
            key: 'actions',
            header: 'Cancel',
            render: (row) =>
              row?.status !== 'canceled' ? (
                <CancelButton onClick={() => handleCancelBet(row?.id, token)}>
                  <CancelLogo src={Cancel} />
                </CancelButton>
              ) : (
                '-'
              ),
          },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: statusOptions,
          },
        ]}
      />

      <PlaceBet
        onPlaceBet={handlePlaceBet}
        balance={getBalance() || 0}
        minAmount={1}
        maxAmount={getBalance()}
      />
    </Container>
  )
}

export default Home
