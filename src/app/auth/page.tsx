import { AuthForm } from "./auth-form";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
         <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 1-2 1.73V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.18a2 2 0 0 1-1-1.73l-.44-.25a2 2 0 0 1-2-1.73V4a2 2 0 0 0-2-2h-4.44Z"/><path d="M18 5v14"/><path d="m9 10 3 3 3-3"/></svg>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                  TaskTrack
                </h1>
            </Link>
            <p className="text-muted-foreground">Welcome back! Sign in to continue.</p>
        </div>
        <AuthForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
            </Link>
            .
        </p>
      </div>
    </div>
  );
}
