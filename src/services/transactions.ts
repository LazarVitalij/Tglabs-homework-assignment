import { fetchGetApi } from '@/helpers/fetchers'
import { TransactionsDetails, TransactionsResponse } from '@/types/transactions'

export const getTransactions = (
  body: TransactionsDetails,
  token: string
): Promise<TransactionsResponse> => {
  const params = new URLSearchParams({
    page: body.page.toString(),
    limit: body.limit.toString(),
    ...(body.id && { id: body.id }),
    ...(body.type && { type: body.type }),
  })
  return fetchGetApi<TransactionsResponse>(
    `my-transactions?${params.toString()}`,
    token
  )
}
