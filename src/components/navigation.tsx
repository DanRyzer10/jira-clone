import { cn } from '@/lib/utils'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import {GoCheckCircle, GoCheckCircleFill, GoHome,GoHomeFill} from 'react-icons/go'
const routes = [
    {
        label:"Inicio",
        href:"/",
        icon:GoHome,
        activeIcon:GoHomeFill

    },
    {
        label:"Mis Tareas",
        href:"/task",
        icon:GoCheckCircle,
        activeIcon:GoCheckCircleFill

    },
    {
        label:"Configuracion",
        href:"/settings",
        icon:SettingsIcon,
        activeIcon:SettingsIcon

    },
    {
        label:"Mienbros",
        href:"/menbers",
        icon:UsersIcon,
        activeIcon:UsersIcon

    }
]
export const Navigation = ()=>{
    return (
        <ul className='flex flex-col'>
            {
                routes.map((route)=>{
                    const isActive = false;
                    const Icon = isActive ? route.activeIcon : route.icon;
                    return (
                        <Link key={route.href} href={route.href} >
                            <div className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className='size-5 text-neutral-500' />
                                {route.label}

                            </div>
                        </Link>
                    )
                })
            }

        </ul>
    )

}

