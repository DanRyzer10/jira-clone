import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { Hono } from "hono";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/members/utils";

const app = new Hono()
    .get("/",sessionMiddleware,async (c)=>{
        const databases = c.get("databases");
        const user = c.get("user");
        const members = await databases.listDocuments(DATABASE_ID,MEMBERS_ID,

            [Query.equal("userId",user.$id)]
        );
        if(members.total===0){
            return c.json({data:{documents:[],total:0}});
        }

        const workspacesIds = members.documents.map((member)=>member.workspaceId);
        const worspaces = await databases.listDocuments(DATABASE_ID,WORKSPACES_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id",workspacesIds)
            ]
        );
        return c.json({data:worspaces});
       
    }) 
    .post("/",
        zValidator("form",createWorkspaceSchema),
        sessionMiddleware,
        async (c)  =>{
            const databases = c.get("databases");
            const storage = c.get("storage")
            const user = c.get("user");
            const  {name,image} = c.req.valid("form");
            let uploadedImageUrl:string | undefined;
            if (image instanceof  File){
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image,
                );
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

            }else{
                uploadedImageUrl = image;
            }
            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId:user.$id,
                    imageUrl:uploadedImageUrl,
                    inviteCode:generateInviteCode(10)
                }
            );


            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId:user.$id,
                    workspaceId:workspace.$id,
                    role: MemberRole.ADMIN
                }
            )
            return c.json({data:workspace});
        }
    )
    .patch("/:workspaceId",
        sessionMiddleware,
        zValidator("form",updateWorkspaceSchema),
        async (c) =>{
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");
            const {workspaceId} = c.req.param()
            const {name,image} = c.req.valid("form");

            const member = await getMember(databases,workspaceId,user.$id);
            if(!member || member.role  !== MemberRole.ADMIN){
                return c.json({error:"No tienes permisos para editar este espacio de trabajo"},403);
            }

        }
    )

export default app;