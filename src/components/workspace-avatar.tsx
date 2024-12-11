import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar,AvatarFallback } from "./ui/avatar";
interface WorkspaceAvatarProps {
    image?:string;
    name:string;
    className?:string;
}

export const WorkspaceAvatar = ({
    image,
    name,
    className

}:WorkspaceAvatarProps) =>{
    if(image){
        return (
            <div className={
                cn(
                    "size-10  relative rounded-s-md overflow-hidden",
                    className
                )
            }  >
                <Image  src={image} alt={name} fill className="object-cover p-1 rounded-md" />
            </div>
        )
    }

    return (
        <Avatar className={cn("size-10",className)}>
            <AvatarFallback className="text-white bg-blue-600 font-semibold  text-lg uppercase rounded-md "  >{name[0]}</AvatarFallback>
        </Avatar>
    )

}