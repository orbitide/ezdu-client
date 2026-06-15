import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { friends } from "@/lib/mock/achievements"

export function FriendsList() {
  return (
    <div className="space-y-2">
      {friends.map((friend) => (
        <Link key={friend.id} href={`/profile/${friend.username}`}>
          <Card className="transition hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 py-3">
              <span
                className={`size-2.5 shrink-0 rounded-full ${friend.online ? "bg-green-500" : "bg-muted-foreground/30"}`}
              />
              <div className="flex-1">
                <p className="font-medium">{friend.name}</p>
                <p className="text-xs text-muted-foreground">লেভেল {friend.level}</p>
              </div>
              <span className="text-xs text-muted-foreground">{friend.online ? "অনলাইন" : "অফলাইন"}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
