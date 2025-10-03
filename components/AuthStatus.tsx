"use client";

import { LogIn, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const AuthStatus = () => {
        const { status, data: session } = useSession();
        console.log(status);

        if (status == "loading") {
                return <Skeleton className="w-9 h-9" />;
        }

        if (status == "unauthenticated") {
                return (
                        <Button variant={"ghost"} size="icon" asChild>
                                <Link href="/auth/signin">
                                        <LogIn className="h-5 w-5" />
                                </Link>
                        </Button>
                );
        }
        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

export default AuthStatus;
