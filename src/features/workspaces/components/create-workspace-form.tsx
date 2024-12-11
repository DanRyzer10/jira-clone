"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import Image from "next/image";
import { z } from "zod";
import { ImageIcon } from "lucide-react";
import { Card,CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CreateWorkspaceFormProps {
    onCancel?: ()=>void;
};

export const CreateWorkspaceForm  = ({onCancel}:CreateWorkspaceFormProps) => {
    const router = useRouter();
    const {mutate,isPending} = useCreateWorkspace();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            form.setValue("image",file);
        }
    }
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
           name:""
        }
    })

    const onSubmit = (values:z.infer<typeof createWorkspaceSchema>)=>{
        const finalValues = {
            ...values,
            image:values.image instanceof File?values.image:"",

        }
        mutate({form:finalValues},{
            onSuccess:({data})=>{
                form.reset();
                // onCancel?.();
                router.push(`/workspaces/${data.$id}`)                
            }
        }
        );
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
                        <FormField
                            control={form.control}
                            name="image"
                            render={({field})=>(
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center gap-x-5">
                                       {field.value?(
                                        <div className="size-[72px] relative rounded-md overflow-hidden">
                                            <Image
                                            width={72}
                                            height={72}
                                            alt="Workspace Image"
                                            className="object-cover"
                                                src={
                                                    field.value instanceof File?
                                                    URL.createObjectURL(field.value)
                                                    : field.value
                                                }
                                            />
                                        </div>
                                       ):(
                                        <Avatar className="size-[72px]">
                                            <AvatarFallback>
                                                <ImageIcon className="size-[36px] text-neutral-400" />
                                            </AvatarFallback>
                                        </Avatar>
                                        )
                                       }
                                       <div className="flex flex-col">
                                        <p className="text-sm">
                                            Icono de workspace
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            JPG,PNG,SVG or JPEF,  max  1mb
                                        </p>
                                        <input className="hidden"accept=".jpg, .png, .jpeg,.svg" type="file"
                                            ref={inputRef} disabled={isPending}
                                            onChange={handleImageChange}
                                        />
                                       <Button
                                        type="button"
                                        disabled={isPending}
                                        variant="ghost"
                                        size="sm"
                                        onClick={()=>inputRef.current?.click()}

                                       >Cargar Imagen</Button>

                                       </div>
                                    </div>

                                </div>
                            )}
                        />
                        <DottedSeparator/>
                        <div className="flex items-center justify-between">
                            <Button disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            variant={"secondary"} onClick={onCancel}>Cancelar</Button>
                            <Button disabled={isPending} type="submit">Crear espacio de trabajo</Button>
                           

                        </div>
                       </div>
                    </form>

                </Form>

            </CardContent>

        </Card>
    )

}