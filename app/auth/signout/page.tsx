"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const form = useForm<SignUpSchemaType>({
                resolver: zodResolver(signUpSchema),
                defaultValues: {
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                },
        });

        const onSubmit = async (data: SignUpSchemaType) => {
                console.log(data);
        };

        return (
                <main className="flex min-h-screen flex-col items-center justify-center p-4">
                        <Card className="w-full max-w-md">
                                <CardHeader>
                                        <CardTitle>Create an account</CardTitle>
                                        <CardDescription>
                                                Or{" "}
                                                <Link
                                                        href="/auth/signin"
                                                        className="font-medium text-primary hover:underline"
                                                >
                                                        sign in instead
                                                </Link>
                                        </CardDescription>
                                </CardHeader>
                                <CardContent>
                                        <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                        <FormField
                                                                control={form.control}
                                                                name="name"
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Name</FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="Name"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
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
                                                                                        <Input
                                                                                                placeholder="Email"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
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
                                                                                        <div className="relative">
                                                                                                <Input
                                                                                                        placeholder="Password"
                                                                                                        type={
                                                                                                                showPassword
                                                                                                                        ? "text"
                                                                                                                        : "password"
                                                                                                        }
                                                                                                        {...field}
                                                                                                />
                                                                                                <button
                                                                                                        type="button"
                                                                                                        onClick={() =>
                                                                                                                setShowPassword(
                                                                                                                        !showPassword
                                                                                                                )
                                                                                                        }
                                                                                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                                                                >
                                                                                                        {showPassword ? (
                                                                                                                <EyeOff className="h-5 w-5" />
                                                                                                        ) : (
                                                                                                                <Eye className="h-5 w-5" />
                                                                                                        )}
                                                                                                </button>
                                                                                        </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                control={form.control}
                                                                name="confirmPassword"
                                                                render={({ field }) => (
                                                                        <FormItem>
                                                                                <FormLabel>Confirm Password</FormLabel>
                                                                                <FormControl>
                                                                                        <div className="relative">
                                                                                                <Input
                                                                                                        placeholder="Confirm Password"
                                                                                                        type={
                                                                                                                showConfirmPassword
                                                                                                                        ? "text"
                                                                                                                        : "password"
                                                                                                        }
                                                                                                        {...field}
                                                                                                />
                                                                                                <button
                                                                                                        type="button"
                                                                                                        onClick={() =>
                                                                                                                setShowConfirmPassword(
                                                                                                                        !showConfirmPassword
                                                                                                                )
                                                                                                        }
                                                                                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                                                                >
                                                                                                        {showConfirmPassword ? (
                                                                                                                <EyeOff className="h-5 w-5" />
                                                                                                        ) : (
                                                                                                                <Eye className="h-5 w-5" />
                                                                                                        )}
                                                                                                </button>
                                                                                        </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />

                                                        <Button type="submit" className="w-full">
                                                                Sign Up
                                                        </Button>
                                                </form>
                                        </Form>
                                </CardContent>
                        </Card>
                </main>
        );
}
