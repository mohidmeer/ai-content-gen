"use client"
import { FaGoogle } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession ,SessionProvider } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth";
import Link from "next/link";
import { handleSignIn } from "@/actions/auth.actions";





export default function Page() {

    const formSchema = z.object({
        password: z.string().min(6, {
            message: "must be at least 6 characters.",
        }),
        email: z.string().email("Provide a correct email address")
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",

        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }


    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon@gmail.com" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="*********" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-xs text-right" >Dont have an Account? <Link className="font-bold underline" href={'/auth/sign-up'}>Sign Up</Link> </p>
                    <Button type="submit" className="w-full">Submit</Button>

                </form>
            </Form>
            <div className="relative mt-5">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <Button className="w-full mt-4 flex gap-2" onClick={()=>{ handleSignIn()}} >
                <FaGoogle size={18} />
                Sign In with Google
            </Button>
        </div>
    )
}