import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { CheckCircle, PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:py-32">
          <div className="mb-4 rounded-full border bg-card px-3 py-1 text-sm">
            <span className="mr-2">🎉</span> We just launched our new version! <Link href="#" className="font-semibold underline">Read more</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Effortless Task Management
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            A complete task management platform with a simple setup, robust features, and expert support at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <Button asChild size="lg" variant="outline">
              <Link href="#">
                <PlayCircle className="mr-2 h-5 w-5" />
                How it works
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="bg-card/50 py-20 md:py-24">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Easy Task Management</h3>
                <p className="text-muted-foreground">
                  Quickly add, edit, and delete tasks.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Filter and Sort</h3>
                <p className="text-muted-foreground">
                  Organize tasks by status, due date, or creation time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Light & Dark Modes</h3>
                <p className="text-muted-foreground">
                  Switch between light and dark themes for your comfort.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          © {new Date().getFullYear()} TaskTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
