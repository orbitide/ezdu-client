import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <Image src="/logo-rounded.png" alt="EZDU" width={72} height={72} className="rounded-2xl" />
        <h1 className="bg-brand-gradient bg-clip-text text-transparent">EZDU</h1>
        <p className="text-muted-foreground">
          SSC, HSC, ভর্তি ও চাকরির পরীক্ষার প্রস্তুতি একসাথে।
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/login">লগ ইন</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">অ্যাকাউন্ট তৈরি করো</Link>
        </Button>
      </div>
    </div>
  );
}
