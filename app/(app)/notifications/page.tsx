"use client"

import { useState } from "react"
import { notifications } from "@/lib/mock/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Trophy, MessageCircle, CreditCard, AlertCircle, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "@/lib/time"

const typeConfig = {
  subscription: { icon: CreditCard, color: "text-blue-500 bg-blue-50" },
  progress: { icon: Trophy, color: "text-yellow-500 bg-yellow-50" },
  discussion: { icon: MessageCircle, color: "text-purple-500 bg-purple-50" },
  content: { icon: BookOpen, color: "text-green-500 bg-green-50" },
  exam: { icon: AlertCircle, color: "text-red-500 bg-red-50" },
  system: { icon: Bell, color: "text-gray-500 bg-gray-50" },
}

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications)
  const unreadCount = items.filter(n => !n.read).length

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-muted-foreground mt-1">{unreadCount}টি অপঠিত</p>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => setItems(p => p.map(n => ({ ...n, read: true })))} className="gap-2">
            <CheckCheck className="h-4 w-4" />সব পড়া হয়েছে
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
        {items.map(notif => {
          const cfg = typeConfig[notif.type]
          const Icon = cfg.icon
          return (
            <div
              key={notif.id}
              className={cn("flex gap-4 p-4 cursor-pointer transition-colors hover:bg-muted/30", !notif.read && "bg-primary/[0.03]")}
              onClick={() => setItems(p => p.map(n => n.id === notif.id ? { ...n, read: true } : n))}
            >
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", cfg.color)}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-medium leading-snug", !notif.read && "font-semibold")}>{notif.title}</p>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{notif.body}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{formatDistanceToNow(notif.createdAt)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
