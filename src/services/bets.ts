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

export const getBets = (
  body: UserBetsDetails,
  token: string
): Promise<UserBetsResponse> => {
  const params = new URLSearchParams({
    page: body.page.toString(),
    limit: body.limit.toString(),
    ...(body.id && { id: body.id }),
    ...(body.status && { status: body.status }),
  })

  return fetchGetApi<UserBetsResponse>(`my-bets?${params.toString()}`, token)
}

export const cancelBet = (
  id: string,
  token: string
): Promise<CanceledBetResponse> => {
  return fetchDeleteApi<CanceledBetResponse, null>(`my-bet/${id}`, null, token)
}
