import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AskDoubtButtonProps {
  lessonId: string
}

export function AskDoubtButton({ lessonId }: AskDoubtButtonProps) {
  return (
    <Button asChild variant="outline" className="gap-1.5">
      <Link href={`/learn/qa/new?lessonId=${lessonId}`}>
        <HelpCircle className="size-4" />
        একটি প্রশ্ন জিজ্ঞাসা করো
      </Link>
    </Button>
  )
}
