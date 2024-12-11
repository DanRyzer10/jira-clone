import {z} from "zod"

export const createWorkspaceSchema = z.object({
    name:z.string().trim().min(1,"El nombre es requerido"),
    image:z.union([
        z.instanceof(File),
        z.string().transform(e=>e===""?undefined:e)
    ])
    .optional()
});

export const updateWorkspaceSchema = z.object({
    name:z.string().trim().min(1,"El nombre necesita  1 o mas caracteres").optional(),
    image:z.union([
        z.instanceof(File),
        z.string().transform(e=>e===""?undefined:e)
    ])
    .optional()
})