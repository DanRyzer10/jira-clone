import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = ()=>{
    const router = useRouter()
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn:async(data)=>{
            const response = await client.api.auth.logout["$post"]();
            return await response.json() as ResponseType;
        },
        onSuccess:()=>{
            toast({
                title:"Cierre de sesion exitoso",
                description:"Has cerrado sesion con exito",
                variant:"default"
            })
            router.refresh();
            queryClient.invalidateQueries({queryKey:["current"]});
            queryClient.invalidateQueries({queryKey:["workspaces"]});
        },
        onError:()=>{
            toast({
                title:"Error  al cerrar sesion",
                description:"Ha ocurrido un error al cerrar sesion",
                variant:"destructive"
            })
        }
    })

    return mutation;
}