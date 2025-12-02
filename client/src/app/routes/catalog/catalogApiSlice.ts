import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICard } from "../../components/card/Card"

export interface Product extends ICard {
    description: string
    category: string
    rating: {
        rate: number
        count: number
    }
}
  
export const catalogApiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'products',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ baseUrl: "/api",
        headers: {
            "Content-Type": "application/json",
        }
    },
        
    ),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
      // The `getProducts` endpoint is a "query" operation that returns data.
      // The return value is a `Product[]` array, and it takes no arguments.
      getProducts: builder.query<Product[], void>({
        query: () => '/products'
      })
    })
  })
  
  // Export the auto-generated hook for the `getPosts` query endpoint
  export const { useGetProductsQuery } = catalogApiSlice