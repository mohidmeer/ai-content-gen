"use client"
import { FaGoogle } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
// import { signIn } from "@/auth";
import Link from "next/link";



export default function Page() {

   

    const formSchema = z.object({
        password: z.string().min(6, {
            message: "must be at least 6 characters.",
        }),
        cpassword: z.string(),
        email: z.string().email("Provide a correct email address"),
        name: z.string().min(3,{message:"must have at least 3 characters"}),
        
    }).refine((data:{password:string,cpassword:string}) => data.password === data.cpassword, {
        path: ['cpassword'],
        message: "Passwords don't match.",
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon Doe" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="cpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                    <p className="text-xs text-right" >Already have an Account? <Link className="font-bold underline" href={'/auth/sign-in'}>Sign In</Link> </p>
                    <Button type="submit" className="w-full">Submit</Button>

                </form>
            </Form>
            
            <Button  className="w-full mt-4 flex gap-2" >
                <FaGoogle size={18}/>
                Sign In with Google
            </Button>
        </div>
    )
}