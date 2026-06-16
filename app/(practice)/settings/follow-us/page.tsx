import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const socials = [
  { name: "Facebook", handle: "@ezdu.bd", url: "https://facebook.com/ezdu.bd", color: "bg-blue-600", initial: "f" },
  { name: "YouTube", handle: "Ezdu Bangladesh", url: "https://youtube.com/@ezdu", color: "bg-red-600", initial: "▶" },
  { name: "Instagram", handle: "@ezdu.bd", url: "https://instagram.com/ezdu.bd", color: "bg-pink-500", initial: "ig" },
  { name: "Twitter / X", handle: "@ezdu_bd", url: "https://twitter.com/ezdu_bd", color: "bg-sky-500", initial: "𝕏" },
]

export default function FollowUsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">আমাদের অনুসরণ করো</h2>
        <p className="mt-1 text-sm text-muted-foreground">সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকো।</p>
      </div>
      <div className="space-y-2">
        {socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 py-4">
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${s.color} text-sm font-bold text-white`}>
                  {s.initial}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.handle}</p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
