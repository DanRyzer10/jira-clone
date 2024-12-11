"use client"
import { RiAddCircleFill } from "react-icons/ri"

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { WorkspaceAvatar } from "./workspace-avatar"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateWorkSpaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"
import { useGetWorkspaceSelected,useShareWorkspaceSelected } from "@/features/workspaces/hooks/use-share-workspace-selected"


export const WorkSpaceSwitcher = () =>{
    const workspaceId:string = useGetWorkspaceSelected() || useWorkspaceId();
    const {data:workspaces} = useGetWorkspaces();
    const {open} = useCreateWorkSpaceModal()
    const router = useRouter();
    const onSelect = (id:string) => {
        useShareWorkspaceSelected(id)
        router.push(`/workspaces/${id}`)

    }
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Espacios de trabajo</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-55" />

            </div>
            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="Espacio de trabajo no seleccionado" />
                </SelectTrigger>
                <SelectContent>
                    {
                        workspaces?.documents.map((workspace) => (
                            <SelectItem key={workspace.$id} value={workspace.$id}>
                               <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar className="p-1" name={workspace.name} image={workspace.imageUrl} />
                                <span className="truncate"   >{workspace.name}</span>
                               </div>
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

        </div>
    )
}