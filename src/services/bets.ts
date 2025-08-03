import { fetchPostApi, fetchGetApi, fetchDeleteApi } from '@/helpers/fetchers'
import {
  BetDetails,
  BetResponse,
  UserBetsDetails,
  UserBetsResponse,
  CanceledBetResponse,
} from '@/types/bets'

export const placeBet = async (
  body: BetDetails,
  token: string
): Promise<BetResponse> => {
  const response = await fetchPostApi<BetResponse, BetDetails>(
    'bet',
    body,
    token
  )
  return response
}

export const getBets = async (
  body: UserBetsDetails,
  token: string
): Promise<UserBetsResponse> => {
  const params = new URLSearchParams({
    page: body.page.toString(),
    limit: body.limit.toString(),
    ...(body.id && { id: body.id }),
    ...(body.status && { status: body.status }),
  })

  const response = await fetchGetApi<UserBetsResponse>(
    `my-bets?${params.toString()}`,
    token
  )
  return response
}

export const cancelBet = async (
  id: string,
  token: string
): Promise<CanceledBetResponse> => {
  const response = await fetchDeleteApi<CanceledBetResponse, null>(
    `my-bet/${id}`,
    null,
    token
  )
  return response
}
