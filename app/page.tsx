import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="space-y-2">
        <h1 className="bg-brand-gradient bg-clip-text text-transparent">EZDU</h1>
        <p className="text-muted-foreground">
          Practice and learn for SSC, HSC, admission and job exams.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Create account</Link>
        </Button>
      </div>
    </div>
  );
}
