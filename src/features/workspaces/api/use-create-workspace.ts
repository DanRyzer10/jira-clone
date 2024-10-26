import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useToast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = ()=>{
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn:async({form})=>{
            const response = await client.api.workspaces["$post"]({form});
            return await response.json() as ResponseType;
        },
        onSuccess:() =>{
            toast({
                title:"Espacio de trabajo creado",
                description:"El espacio de trabajo ha sido creado con exito",
                variant:"default"
            })

            queryClient.invalidateQueries({queryKey:["workspaces"]});
        },
        onError:()=>{
            toast({
                title:"Error al crear el espacio de trabajo",
                description:"Ha ocurrido un error al crear el espacio de trabajo",
                variant:"destructive"
            })
        }
    })

    return mutation;
}