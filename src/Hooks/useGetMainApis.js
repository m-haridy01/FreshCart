import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetMainApis(apiName) {
    let {data, isError, isLoading, error} = useQuery({
        queryKey: [apiName],
        queryFn: ()=>{
            return  axios.get(`${import.meta.env.VITE_BASE_URL}/${apiName}`)
        }
    })
    return {data, isError, isLoading, error}
}