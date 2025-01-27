import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = ()=>{
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const router = useRouter();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn:async(data)=>{
            const response = await client.api.auth.login["$post"](data);
            return await response.json() as ResponseType;
        },
        onSuccess:() =>{
            toast({
                title:"Inicio de sesion exitoso",
                description:"Has iniciado sesion con exito",
                variant:"default"
            })
            router.refresh();
            queryClient.invalidateQueries({queryKey:["current"]});
        },
        onError:()=>{
            toast({
                title:"Error  al iniciar sesion",
                description:"Ha ocurrido un error al iniciar sesion",
                variant:"destructive"
            })
        }
    })

    return mutation;
}