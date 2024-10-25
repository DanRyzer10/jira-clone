import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
    .post("/",
        zValidator("json",createWorkspaceSchema),
        sessionMiddleware,
        async (c)  =>{
            const datasabases = c.get("databases");
            const user = c.get("user");
            const  {name} = c.req.valid("json");
            const workspace = await datasabases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId:user.$id
                }
            );
            return c.json({data:workspace});
        }
    )

export default app;