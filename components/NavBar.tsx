import { ThemeSwitch } from "./ThemeSwitch"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import React from "react"
import { NavMenuItems } from "@/constants"
import { Button } from "./ui/button"
import Logo from "./Logo"

const NavBar = () => {



    return (
        <div className=" w-full fixed top-5 z-20 ">
           <div className="mx-auto container flex items-center justify-between p-3 rounded-full border border-border bg-background/65 ">
           <Logo/>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            {/* <Icons.logo className="h-6 w-6" /> */}
                                            <div className="">
                                                <Logo className="text-xl" logoSize="20" />
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Create buzz-worthy viral content in mere minutes! 
                                                Transform your thoughts into compelling stories
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {NavMenuItems.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/pricing" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Pricing
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/pricing" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Blogs
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
                <Button asChild>
                <Link href={'/auth/sign-in'} className="text-lg">Get Started</Link>
                   
                </Button>
                <ThemeSwitch />
            </div>
           </div>
        </div>
    )
}

export default NavBar


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem';