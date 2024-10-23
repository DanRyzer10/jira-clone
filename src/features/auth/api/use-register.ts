import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>

export const useRegister = ()=>{
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn:async(data)=>{
            const response = await client.api.auth.register["$post"](data);
            return await response.json() as ResponseType;

        }
    })

    return mutation;
}
