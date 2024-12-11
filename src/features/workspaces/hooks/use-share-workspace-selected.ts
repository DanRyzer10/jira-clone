export const useShareWorkspaceSelected = (workSpaceId:string) => {
    localStorage.setItem("current-workspace",workSpaceId) 
}
export const useGetWorkspaceSelected = () => {
    try{
        if(!localStorage.getItem("current-workspace")) return null
        return localStorage.getItem("current-workspace")
    }catch(e){
        console.error(e)
    }
}