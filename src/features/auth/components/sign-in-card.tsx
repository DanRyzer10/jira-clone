"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/DottedSeparator";
import { loginSchema} from "../schema";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLogin } from "../api/use-login"; 
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";

export const SignInCard = () => {
    const {mutate} = useLogin();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({
            json:values
        });
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none  p-5  shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-6">
                <CardTitle className="text-2xl">Bienvenido de nuevo</CardTitle>
            </CardHeader>
            <div className="mb-2 p-2">
                <DottedSeparator></DottedSeparator>
            </div>
            <CardContent className="">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex  flex-col gap-2">
                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        placeholder="Correo electrónico"
                                    >
                                    </Input>
                                </FormControl>

                                <FormMessage {...form.formState.errors} className=""   ></FormMessage>
                            </FormItem>

                        )}>

                        </FormField>


                        <FormField name="password" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        placeholder="Contraseña"
                                    >
                                    </Input>
                                </FormControl>

                                <FormMessage {...form.formState.errors} className=""   ></FormMessage>
                            </FormItem>

                        )}>

                        </FormField>

                        {/* <Input
                        required
                        type="password"
                        value={""}
                        onChange={()=>{}}
                        placeholder="Contraseña"
                        disabled={false}
                    >  
                    </Input> */}

                        <Button disabled={false} size="lg" className="w-full" >
                            Iniciar sesión
                        </Button>

                    </form>
                </Form>

            </CardContent>

            <div className="mb-2 p-2">
                <DottedSeparator></DottedSeparator>
            </div>
            <div className="p-2">
                <Button variant="secondary" disabled={false} size="lg" className="w-full" >
                    <FcGoogle className="inline-block mr-2" size={20}></FcGoogle>
                    Iniciar con Google
                </Button>
            </div>

            <div className="p-2">
                <Button variant="secondary" disabled={false} size="lg" className="w-full" >
                    <FaGithub className="inline-block mr-2" size={20}></FaGithub>
                    Iniciar con Github
                </Button>
            </div>
            <div className="px-7">
                <DottedSeparator/>

            </div>

            <CardContent>
                <div className="flex justify-center items-center">
                    <p className="text-sm">¿No tienes una cuenta?</p>
                    <Link href="/sign-up">
                        <span className="text-blue-700">&nbsp;Registrate</span>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}