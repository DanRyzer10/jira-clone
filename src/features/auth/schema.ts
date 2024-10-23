import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().min(1).email(),
    password: z.string().min(8)
})

export const RegisterSchema = z.object({
    email: z.string().trim().min(1).email(),
    password: z.string().min(8),
    name: z.string().min(1)
})