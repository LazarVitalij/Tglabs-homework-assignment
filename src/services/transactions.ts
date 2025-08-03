import { fetchGetApi } from '@/helpers/fetchers'
import { TransactionsDetails, TransactionsResponse } from '@/types/transactions'

export const getTransactions = async (
  body: TransactionsDetails,
  token: string
): Promise<TransactionsResponse> => {
  const params = new URLSearchParams({
    page: body.page.toString(),
    limit: body.limit.toString(),
    ...(body.id && { id: body.id }),
    ...(body.type && { type: body.type }),
  })
  const response = await fetchGetApi<TransactionsResponse>(
    `my-transactions?${params.toString()}`,
    token
  )
  return response
}
