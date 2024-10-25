"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/DottedSeparator";
import { AlertCircle } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"

import { Input } from "@/components/ui/input"
import { RegisterSchema } from "../schema";
import {useRegister} from "../api/use-register"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useState } from "react";

export const SignUpCard = ()=>{
    const {mutate}= useRegister();
    const [registerError,setRegisterError]  = useState(false)
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        mutate({
            json:values
        },)

    }
    return (
        <Card className="w-full h-full md:w-[487px] border-none  p-5  shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-6">
                <CardTitle className="text-2xl">Registrate</CardTitle>
                <CardDescription className="text-sm">
                    Al Registrarte aceptas  nuestros {" "}
                    <Link href="/privacy">
                    <span className="text-blue-700">
                        Términos y Condiciones
                    </span>
                    </Link> {" "}

                    <Link href="/privacy">
                    <span className="text-red-700">
                        Términos de servicio
                    </span>
                    </Link> {" "}

                </CardDescription>
            </CardHeader>
            <div className="mb-2 p-2">
             <DottedSeparator></DottedSeparator>
           </div>
           {
            registerError &&  (
                <Alert variant="destructive" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                       El usuario ya existe, por favor utilice otro correo
                    </AlertDescription>
            </Alert>
            )
           }
            <CardContent className="">
                <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex  flex-col gap-2">
                <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        {...field}
                                        placeholder="Ingresa tu nombre"
                                    >
                                    </Input>
                                </FormControl>

                                <FormMessage {...form.formState.errors} className=""   ></FormMessage>
                            </FormItem>

                        )}>

                        </FormField>
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

                    <Button disabled={false} size="lg" className="w-full" >
                        Registrate
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

            <CardContent >
                <div className="flex justify-center items-center">
                    <p className="text-sm">¿Ya tienes una cuenta?</p>
                    <Link href="/sign-in">
                        <span className="text-blue-700">&nbsp;Iniciar sesion</span>
                    </Link>
                </div>
            </CardContent>
            
        </Card>
    )
}