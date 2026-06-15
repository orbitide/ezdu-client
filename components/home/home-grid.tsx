import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { homeGridItems } from "@/lib/mock/home"

export function HomeGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {homeGridItems.map((item) => (
        <Link key={item.id} href={item.href}>
          <Card className="transition hover:bg-muted/50">
            <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
              <Image src={`/icons/${item.icon}`} alt="" width={40} height={40} className="size-10" />
              <p className="text-xs font-medium">{item.label}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
