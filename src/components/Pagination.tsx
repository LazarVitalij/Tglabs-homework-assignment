import { ReactElement } from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem;
  align-items: center;
  margin-top: 1.6rem;

  @media (max-width: 600px) {
    justify-content: space-between;
    width: 94%;
  }
`

const PageInfo = styled.span`
  color: ${({ theme }): string => theme.primary};
  font-size: 1.1rem;
`

export interface PaginationProps {
  handlePaginationChange: (page: number) => void
  pagination: {
    page: number
    limit: number
    totalPages: number
  }
}

const Pagination = ({
  handlePaginationChange,
  pagination,
}: PaginationProps): ReactElement => {
  return (
    <Container>
      <Button
        disabled={pagination.page === 1}
        text="Previous"
        onClick={() => handlePaginationChange(pagination.page - 1)}
      />

      <PageInfo>
        Page {pagination.page} of {pagination.totalPages}
      </PageInfo>
      <Button
        disabled={pagination.page >= pagination.totalPages}
        text="Next"
        onClick={() => handlePaginationChange(pagination.page + 1)}
      />
    </Container>
  )
}

export default Pagination
