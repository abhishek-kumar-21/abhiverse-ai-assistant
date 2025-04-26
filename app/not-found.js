import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className=" flex items-center justify-center min-h-screen flex-col p-6 text-center">
            {/* 404 Heading */}
            <h1 className="text-8xl font-extrabold drop-shadow-lg">
                404
            </h1>

            {/* Description */}
            <p className="mt-4 font-semibold text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>

            <p className="my-3 text-gray-700 dark:text-gray-400">
                It looks like you may have taken a wrong turn.
            </p>

            <Button className="px-6 py-6 text-lg font-medium w-full sm:w-auto hover:scale-105 transition-all duration-400" asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
