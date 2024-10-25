import { useMutation,useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>

export const useRegister = ()=>{
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const router = useRouter();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn:async(data)=>{
            const response = await client.api.auth.register["$post"](data);

            return await response.json() as ResponseType;

        },
        onSuccess:() =>{
            toast({
                title:"Registro exitoso",
                description:"Has registrado con exito",
                variant:"default"
            })
            router.refresh();
            queryClient.invalidateQueries({queryKey:["current"]});
        },
        onError:()=>{
            toast({
                title:"Error al registrarte",
                description:"Ha ocurrido un error al registrarte",
                variant:"destructive"
            })
        }
    })

    return mutation;
}
