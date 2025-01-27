import Image from "next/image"
import Link from "next/link"
import { DottedSeparator } from "./DottedSeparator"
import { Navigation } from "./navigation"
import {WorkSpaceSwitcher} from "./workspace-switcher"


export const Sidebar = () =>{
    return (
       <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
            <Image
                src="/logo.svg" alt="logo"
                width={50}
                height={30}
            ></Image>
            </Link>
            <DottedSeparator className="my-4"/>
                <WorkSpaceSwitcher/>
            <DottedSeparator className="my-4"/>
            <Navigation/>
       </aside>
    )
}