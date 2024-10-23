"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode;
    
}

const AuthLayout = ({children}:AuthLayoutProps) =>{
    const pathname = usePathname();
    const isSignIn = pathname === '/sign-in';
    return (
       <main className='bg-neutral-100 min-h-screen'>
         <div className='mx-auto max-w-screen-2xl p-4'>
            <nav className='flex justify-between items-center'>
            <Image
                src="/logo.svg"
                height={50}
                width={50}
                alt="logo"
            ></Image>
            <div className='flex items-center gap-2'>
                <Button variant="secondary">
                    <Link href={isSignIn?'/sign-up':'/sign-in'}>
                    {isSignIn ? 'Registrate' : 'Iniciar Sesión'}
                    </Link>
                </Button>

            </div>
            </nav>
           <div className='flex flex-col justify-center items-center pt-4 md:pt-1'>
           {children}
           </div>
         </div>
          
       </main>
    )
}

export default AuthLayout;

