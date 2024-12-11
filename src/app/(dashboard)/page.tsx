
import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { getWorkspaces } from "@/features/workspaces/actions";
import { useGetWorkspaceSelected } from "@/features/workspaces/hooks/use-share-workspace-selected";
export default async function Home() {
  const user = await getCurrent();
  console.log(user)
  if(!user) redirect("/sign-in");
  const workspaces = await getWorkspaces();
  if(workspaces?.total===0){
    redirect("/workspaces/create");
  }else{
    const currentWorkspaceId = useGetWorkspaceSelected() || workspaces?.documents[0].$id;
    redirect(`/workspaces/${currentWorkspaceId}`);
  }
  
 return(
  <div >
    Home 
  </div>
 )
}
