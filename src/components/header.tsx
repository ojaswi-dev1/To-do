"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useUser } from "@/firebase";
import { UserNav } from "./user-nav";

export function Header() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 1-2 1.73V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.18a2 2 0 0 1-1-1.73l-.44-.25a2 2 0 0 1-2-1.73V4a2 2 0 0 0-2-2h-4.44Z"/><path d="M18 5v14"/><path d="m9 10 3 3 3-3"/></svg>
            <h1 className="text-2xl font-bold tracking-tight font-headline">
              TaskTrack
            </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isUserLoading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <Button variant="outline" asChild>
                <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
