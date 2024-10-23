import { Hono } from "hono";
import {z} from "zod"

import {zValidator} from "@hono/zod-validator"
import { loginSchema,RegisterSchema } from "../schema";
const app  = new Hono()
.post("/login",zValidator("json",loginSchema
), async (c)=>{
    const {email,password} = c.req.valid("json");
    return c.json({
        email,
        password
    });

})
.post("/register",zValidator("json",RegisterSchema),
    async (c)=>{
        const {email,password,name} = c.req.valid("json");
        return c.json({
            email,
            password,
            name}
        );
    }

)

export default app;

