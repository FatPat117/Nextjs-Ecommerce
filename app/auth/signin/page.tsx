"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInSchemaType } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function SignInPage() {
        const router = useRouter();
        const [error, setError] = useState<string | null>(null);
        const [showPassword, setShowPassword] = useState(false);
        const { data: session, update: updateSession } = useSession();
        const form = useForm<SignInSchemaType>({
                resolver: zodResolver(signInSchema),
                defaultValues: {
                        email: "",
                        password: "",
                },
        });

        const onSubmit = async (data: SignInSchemaType): Promise<void> => {
                setError(null);

                try {
                        const result = await signIn("credentials", {
                                email: data.email,
                                password: data.password,
                                redirect: false,
                        });
                        if (result?.error) {
                                if (result.error == "CredentialsSignin") {
                                        setError("Invalid credentials");
                                } else {
                                        setError("An error occurred");
                                }
                        } else {
                                await updateSession();
                                router.push("/");
                        }
                } catch (_error) {
                        setError("An error occurred");
                        console.error("SingIn Error", _error);
                }
        };

        return (
                <main className="flex min-h-screen items-center justify-center bg-muted px-4">
                        <Card className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-sm shadow-md">
                                <CardHeader className="text-center">
                                        <CardTitle className="text-xl sm:text-2xl font-bold">
                                                Sign In to your account
                                        </CardTitle>
                                        <CardDescription className="text-sm sm:text-base">
                                                Or{" "}
                                                <Link
                                                        href="/auth/signup"
                                                        className="font-medium text-primary hover:underline"
                                                >
                                                        create an account
                                                </Link>
                                        </CardDescription>
                                </CardHeader>

                                {error && (
                                        <CardContent>
                                                <p className="mb-4 text-sm text-destructive ">{error}</p>
                                        </CardContent>
                                )}
                                <CardContent>
                                        <Form {...form}>
                                                <form
                                                        onSubmit={form.handleSubmit(onSubmit)}
                                                        className="space-y-4 sm:space-y-6"
                                                >
                                                        {/* Email */}
                                                        <FormField
                                                                control={form.control}
                                                                name="email"
                                                                render={({ field }) => (
                                                                        <FormItem className="space-y-1">
                                                                                <FormLabel>Email</FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                {...field}
                                                                                                placeholder="Email"
                                                                                                className="text-sm sm:text-base"
                                                                                                aria-invalid={
                                                                                                        !!form.formState
                                                                                                                .errors
                                                                                                                .email
                                                                                                }
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />

                                                        {/* Password with toggle */}
                                                        <FormField
                                                                control={form.control}
                                                                name="password"
                                                                render={({ field }) => (
                                                                        <FormItem className="space-y-1">
                                                                                <FormLabel>Password</FormLabel>
                                                                                <FormControl>
                                                                                        <div className="relative">
                                                                                                <Input
                                                                                                        type={
                                                                                                                showPassword
                                                                                                                        ? "text"
                                                                                                                        : "password"
                                                                                                        }
                                                                                                        {...field}
                                                                                                        placeholder="Password"
                                                                                                        className="pr-10 text-sm sm:text-base"
                                                                                                        aria-invalid={
                                                                                                                !!form
                                                                                                                        .formState
                                                                                                                        .errors
                                                                                                                        .password
                                                                                                        }
                                                                                                />
                                                                                                <Button
                                                                                                        type="button"
                                                                                                        variant="ghost"
                                                                                                        size="sm"
                                                                                                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1"
                                                                                                        onClick={() =>
                                                                                                                setShowPassword(
                                                                                                                        (
                                                                                                                                prev
                                                                                                                        ) =>
                                                                                                                                !prev
                                                                                                                )
                                                                                                        }
                                                                                                >
                                                                                                        {showPassword ? (
                                                                                                                <EyeOff className="h-4 w-4" />
                                                                                                        ) : (
                                                                                                                <Eye className="h-4 w-4" />
                                                                                                        )}
                                                                                                </Button>
                                                                                        </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />

                                                        <Button type="submit" className="w-full">
                                                                Sign In
                                                        </Button>
                                                </form>
                                        </Form>
                                </CardContent>
                        </Card>
                </main>
        );
}
