import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { Root_State } from "./store"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: (headers, {getState}) => {
            const user = (getState() as Root_State)

            if (user) {
                headers.set("Authorization", `Bearer ${user}`)
            }
            return headers
        }
    }),
    tagTypes: ["Marks", "Users"],
    endpoints: () => ({})
})