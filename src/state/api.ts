import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Product{
    productId: string;
    name: string;
    price: number;
    rating?: number,
    stockQuantity: number;
}
export interface NewProduct{
    name: string;
    price: number;
    rating?: number,
    stockQuantity: number;
}
export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}
export interface PurchasesSummary{
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}
export interface ExpenseSummary{
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}
export interface ExpenseByCategorySummary{
    ExpenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}
export interface DashboardMetrics{
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchasesSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}
export interface User{
    userId: string,
    name: string,
    email: string
}

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_KEY}),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics","Products","Users","Expenses"], //all the tags
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
           query: ()=> "/dashboard",
           providesTags: ["DashboardMetrics"]  
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search)=> ({
                url: "/products",
                params: search? {search} : {}
            }),
            providesTags: ["Products"]  //creates a cache and save the data from the respond with this name tag
         }),
         createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct)=> ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"] //re-fetch the data with the added product  so it invalidate the product tag and recreate it
         }),
         getUsers: build.query<User[], void>({
            query: ()=>"/users",
            providesTags: ["Users"]
         }),
        getExpensesByCategory: build.query<ExpenseByCategorySummary[],void>({
            query: ()=>"/expenses",
            providesTags: ["Expenses"],
        })
         
    }),
})

export const {
    useGetDashboardMetricsQuery,
    useCreateProductMutation,
    useGetProductsQuery,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery
} = api;