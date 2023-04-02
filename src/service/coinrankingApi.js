import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIP_API_KEY
}
const baseUrl = process.env.REACT_APP_CRYPTO_BASE_URL
const createRequest = (url,params) => ({
    url,
    headers : cryptoHeaders,
    params,
})

const params = {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    limit: '100',
    timePeriod: '24h',
    orderDirection: 'desc',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    offset: '0',
}
export const coinRankingApi = createApi({
    reducerPath : 'coinRankingApi',
    baseQuery : fetchBaseQuery({ baseUrl }),
    endpoints : (builder) => ({
        getCoins : builder.query({
            query : (limit) => createRequest(`${baseUrl}coins`, {...params, limit})
        }),
        getCoin : builder.query({
            query : (id) => createRequest(`${baseUrl}coin/${id}`, {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'})
        }),
        getCoinHistory : builder.query({
            query : ({ coinId, timePeriod }) => createRequest(`${baseUrl}coin/${coinId}/history/`, {timePeriod})
        }),
    })
})
 
export const {
    useGetCoinsQuery,
    useGetCoinQuery,
    useGetCoinHistoryQuery
} = coinRankingApi
