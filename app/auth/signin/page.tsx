"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function SignInPage() {
        const form = useForm<SignInSchema>({
                resolver: zodResolver(signInSchema),
                defaultValues: {
                        email: "",
                        password: "",
                },
        });

        const onSubmit = (data: SignInSchema) => {
                console.log(data);
        };
        return (
                <main className="flex min-h-screen flex-col items-center justify-center p-4">
                        <Card className="w-full max-w-md">
                                <CardHeader>
                                        <CardTitle>Sign In to your account</CardTitle>
                                        <CardDescription>
                                                Or{" "}
                                                <Link
                                                        href="/auth/signup"
                                                        className="font-medium text-primary hover:underline"
                                                >
                                                        create an account
                                                </Link>
                                        </CardDescription>
                                </CardHeader>
                                <CardContent>
                                        <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                                                        />
                                                                                </FormControl>
                                                                                {/* Display the error message */}
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                        <FormField
                                                                control={form.control}
                                                                name="password"
                                                                render={({ field }) => (
                                                                        <FormItem className="space-y-1">
                                                                                <FormLabel>Email</FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                {...field}
                                                                                                placeholder="Password"
                                                                                        />
                                                                                </FormControl>
                                                                                {/* Display the error message */}
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
