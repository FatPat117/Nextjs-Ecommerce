"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Error = ({ error }: { error: Error }) => {
        const router = useRouter();
        const handleGoBack = () => {
                router.back();
        };
        const handleGoHome = () => {
                router.push("/");
        };
        return (
                <main className="container">
                        <div className="flex flex-col items-center justify-center h-screen">
                                <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
                                <p className="text-lg">Something went wrong</p>
                                <Button onClick={handleGoBack}>Go back</Button>
                                <Button onClick={handleGoHome}>Go to home</Button>
                                <p className="text-lg">{error.message}</p>
                        </div>
                </main>
        );
};

export default Error;
