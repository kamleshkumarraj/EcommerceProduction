import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:2000/api/v2'
    }),
    tagTypes : ['getAllProducts'],
    endpoints : (builder) => ({
        getUserTotalProducts : builder.query({
            query : () => ({
                url : "/common/products/all-products",
                method : "GET",
                credentials : "include"
            }),
            providesTags : ['getAllProducts']
        })
    })
})

export const {useGetUserTotalProductsQuery} = userApi