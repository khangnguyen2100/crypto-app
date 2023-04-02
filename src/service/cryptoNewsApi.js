import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': process.env.REACT_APP_BING_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIP_API_KEY
}

const baseUrl = process.env.REACT_APP_BING_BASE_URL

const createRequest = (url,params) => ({
    url,
    headers : cryptoHeaders,
    params,
})
const params = {
    safeSearch: 'Off', 
    textFormat: 'Raw',
    q: '', 
    freshness: 'Day',
    count : 0
}
export const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery : fetchBaseQuery({ baseUrl }),
    endpoints : (builder) => ({
        getCryptoNews : builder.query({
            query : ({newCategory, count}) => createRequest( baseUrl, {...params, q: newCategory,count} )
        })
    })
})
 
export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi
