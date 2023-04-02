
import { configureStore } from "@reduxjs/toolkit";

import { cryptoNewsApi } from "../service/cryptoNewsApi";
import { coinRankingApi } from "../service/coinrankingApi";
export default configureStore(
    {
        reducer : {
            [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
            [coinRankingApi.reducerPath] : coinRankingApi.reducer,
        },
    }
) 