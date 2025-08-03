export interface BetDetails {
  amount: number
}

export interface BetResponse {
  transactionId: string
  currency: string
  balance: number
  winAmount: number
}

export interface UserBetsDetails {
  id?: string
  status?: string
  page: number
  limit: number
}

export interface BetData {
  id: string
  amount: number
  status: string
  createdAt: Date
  winAmount: number
}

export interface UserBetsResponse {
  data: BetData[]
  total: number
  page: number
  limit: number
}

export interface CanceledBetResponse {
  transactionId: string
  balance: number
  currency: string
}
