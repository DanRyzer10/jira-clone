import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
 return(
  <div  className="flex gap-2 p-2">
    <Button>Button</Button>
    <Button variant="destructive">
      destructive
    </Button>
   
  </div>
 )
}
