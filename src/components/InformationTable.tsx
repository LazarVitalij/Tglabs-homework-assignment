import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Pagination, { PaginationProps } from '@/components/Pagination'
import Error from '@/components/Error'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${({ theme }): string => theme.background};
  border-radius: var(--border-radius);
  padding: 7px 31px;
  box-shadow: var(--box-shadow);
  min-height: 610px;
  justify-content: space-between;
  margin: 2rem;

  @media (max-width: 900px) {
    width: 88vw;
    padding: 10px;
    margin: 0;
    margin-bottom: 6px;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }): string => theme.text};
  width: 100%;
  align-items: center;
`

const HeaderRow = styled(RowWrapper)`
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }): string => theme.text};
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
`

const Paragraph = styled.p`
  color: ${({ theme }): string => theme.text};
  font-size: 1rem;
  border: none;
  border-radius: var(--border-radius);
  background: ${({ theme }): string => theme.background};
  min-width: 170px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 0.8rem;
    padding: 10px;
    margin: 2px;
    min-width: auto;
  }
`
const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const FilterDropdown = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme }): string => theme.text};
  }

  select {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: 1px solid ${({ theme }): string => theme.text};
    background: ${({ theme }): string => theme.background};
    color: ${({ theme }): string => theme.text};
    outline: none;
  }

  @media (max-width: 900px) {
    min-width: 100%;
  }
`
const Title = styled.h2`
  color: ${({ theme }): string => theme.primary};
  margin-bottom: 20px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
`

interface TableColumn {
  key: string
  header: string
  render?: (value: any) => ReactElement | string
}

interface InformationTableProps extends PaginationProps {
  data?: any[]
  columns: TableColumn[]
  error?: string | null
  title?: string
  className?: string
}

interface TableFilter {
  key: string
  label: string
  options: Array<{ value: string; label: string }>
}

interface InformationTableProps extends PaginationProps {
  data?: any[]
  columns: TableColumn[]
  error?: string | null
  title?: string
  className?: string
  filters?: TableFilter[]
  onFilterChange?: (key: string, value: string) => void
}
interface SelectedFilters {
  [key: string]: string
}
const InformationTable = ({
  data,
  columns,
  error,
  title,
  className,
  handlePaginationChange,
  pagination,
  filters = [],
  onFilterChange,
}: InformationTableProps): ReactElement => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: '' }), {})
  )

  const handleFilterChange = (key: string, value: string): void => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }))
    onFilterChange?.(key, value)
  }

  if (!data || data.length === 0) {
    return (
      <Container style={{ justifyContent: 'flex-start' }} className={className}>
        <Title>{title}</Title>
        <HeaderRow>
          {columns.map((column) => (
            <Paragraph key={column.key}>{column.header}</Paragraph>
          ))}
        </HeaderRow>
        <Paragraph>No data available</Paragraph>
      </Container>
    )
  }

  return (
    <Container className={className}>
      <div>
        {filters.length > 0 && (
          <FilterWrapper>
            {filters.map((filter) => (
              <FilterDropdown key={filter.key}>
                <label>{filter.label}</label>
                <select
                  value={selectedFilters[filter.key]}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FilterDropdown>
            ))}
          </FilterWrapper>
        )}

        {title && <Title>{title}</Title>}

        <HeaderRow>
          {columns.map((column) => (
            <Paragraph key={column.key}>{column.header}</Paragraph>
          ))}
        </HeaderRow>

        {data.map((item, index) => (
          <RowWrapper key={item.id || index}>
            {columns.map((column) => (
              <Paragraph key={`${item.id || index}-${column.key}`}>
                {column.render
                  ? column.render(item)
                  : (item[column.key] ?? '-')}
              </Paragraph>
            ))}
          </RowWrapper>
        ))}
      </div>

      <Pagination
        handlePaginationChange={handlePaginationChange}
        pagination={pagination}
      />
      {error && <Error text={error} />}
    </Container>
  )
}

export default InformationTable
