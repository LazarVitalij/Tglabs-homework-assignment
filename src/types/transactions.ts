export interface TransactionsDetails {
  id?: string
  type?: string
  page: number
  limit: number
}

export interface TransactionData {
  id: string
  amount: number
  type: string
  createdAt: Date
}

export interface TransactionsResponse {
  data: TransactionData[]
  total: number
  page: number
  limit: number
}
