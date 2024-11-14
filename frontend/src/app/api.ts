import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: (headers, {getState}) => {
            const user = (getState() as RootState)

            if (user) {
                headers.set("Authorization", `Bearer ${user}`)
            }
            return headers
        }
    }),
    tagTypes: ["Marks", "Users"],
    endpoints: () => ({})
})