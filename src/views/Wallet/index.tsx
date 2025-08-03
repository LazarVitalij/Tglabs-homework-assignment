import { ReactElement, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { handleError } from '@/helpers/utils'
import { TransactionsResponse } from '@/types/transactions'
import { getTransactions } from '@/services/transactions'
import InformationTable from '@/components/InformationTable'

const Container = styled.div`
  min-height: 96vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    padding-top: 75px;
  }
`

const Wallet = (): ReactElement => {
  const { token } = useAuth()
  const [tableError, setTableError] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<TransactionsResponse | null>(
    null
  )
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  const [filtersState, setFiltersState] = useState({
    type: '',
  })
  const handleFilterChange = (key: string, value: string): void => {
    setFiltersState((prev) => ({ ...prev, [key]: value }))
  }

  const typeOptions = [
    { value: 'win', label: 'win' },
    { value: 'bet', label: 'bet' },
    { value: 'cancel', label: 'cancel' },
  ]

  const fetchTransactions = useCallback(
    async (page: number = 1, filters = filtersState) => {
      try {
        const response = await getTransactions(
          {
            page,
            limit: pagination.limit,
            type: filters.type || undefined,
          },
          token
        )
        setTransactions(response)
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(response.total / prev.limit),
        }))
      } catch (error) {
        handleError(error, setTableError)
      }
    },
    [token, pagination.limit, filtersState]
  )

  useEffect(() => {
    fetchTransactions(pagination.page)
  }, [pagination.page, fetchTransactions])

  const handlePaginationChange = (newPage: number): void => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <Container>
      <InformationTable
        title="Transactions"
        data={transactions?.data}
        handlePaginationChange={handlePaginationChange}
        pagination={pagination}
        error={tableError}
        onFilterChange={handleFilterChange}
        columns={[
          { key: 'type', header: 'Type' },
          { key: 'amount', header: 'Amount' },
          {
            key: 'createdAt',
            header: 'Date',
            render: (row) => new Date(row?.createdAt).toLocaleString(),
          },
        ]}
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: typeOptions,
          },
        ]}
      />
    </Container>
  )
}

export default Wallet
