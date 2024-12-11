"use client"
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkSpaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () =>{
    const {open,isOpen,close,setIsOpen} = useCreateWorkSpaceModal()
    return(
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}  ></CreateWorkspaceForm>
        </ResponsiveModal>
    )
}