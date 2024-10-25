"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card,CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";

interface CreateWorkspaceFormProps {
    onCancel?: ()=>void;
};

export const CreateWorkspaceForm  = ({onCancel}:CreateWorkspaceFormProps) => {
    const {mutate,isPending} = useCreateWorkspace();
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
           name:""
        }
    })

    const onSubmit = (values:z.infer<typeof createWorkspaceSchema>)=>{
        mutate({json:values});
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-2xl">Crear espacio de trabajo</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                       <div className="flex flex-col gap-y-4">
                       <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nombre del espacio de trabajo"
                                        {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                            </FormItem>
                            )}
                        />
                        <DottedSeparator/>
                        <div className="flex items-center justify-between">
                            <Button disabled={isPending} variant={"secondary"} onClick={onCancel}>Cancelar</Button>
                            <Button disabled={isPending} type="submit">Crear espacio de trabajo</Button>
                           

                        </div>
                       </div>
                    </form>

                </Form>

            </CardContent>

        </Card>
    )

}