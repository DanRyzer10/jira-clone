import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useToast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>

export const useUpdateWorkspace = ()=>{
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn:async({form,param})=>{
            const response = await client.api.workspaces[":workspaceId"]["$patch"]({
                form,
                param
            });
            return await response.json() as ResponseType;
        },
        onSuccess:() =>{
            toast({
                title:"Espacio de trabajo Actualizado",
                description:"El espacio de trabajo ha sido creado con exito",
                variant:"default"
            })

            queryClient.invalidateQueries({queryKey:["workspaces"]});
            queryClient.invalidateQueries({queryKey:["workspace"]});
        },
        onError:()=>{
            toast({
                title:"Error al Actualizar el espacio de trabajo",
                description:"Ha ocurrido un error al crear el espacio de trabajo",
                variant:"destructive"
            })
        }
    })

    return mutation;
}