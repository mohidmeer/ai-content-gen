'use server';
import { signIn,signOut } from "@/auth"

export const handleSignIn = async () =>{

    await signIn('google',{ redirectTo: "/dashboard" })

}  
export const handleSignOut = async () =>{

    await signOut({redirectTo:'/'})

}  
