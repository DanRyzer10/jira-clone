
import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
export default async function Home() {
  const user = await getCurrent();
  console.log(user)
  if(!user) redirect("/sign-in");
 return(
  <div className="bg-neutral-500 p-4 h-full"  >
    <CreateWorkspaceForm ></CreateWorkspaceForm>
  </div>
 )
}
