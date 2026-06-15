"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { AvatarOptionGrid } from "@/components/avatar/avatar-option-grid"
import { useAvatarStore } from "@/lib/store/avatar-store"
import { studioPanels } from "@/lib/avatar/avatar-data"
import type { AvatarConfig } from "@/lib/types/user"

interface AvatarBuilderProps {
  onSave?: (config: AvatarConfig) => void
  saveLabel?: string
}

export function AvatarBuilder({ onSave, saveLabel = "সংরক্ষণ করো" }: AvatarBuilderProps) {
  const router = useRouter()
  const config = useAvatarStore((s) => s.config)
  const setOption = useAvatarStore((s) => s.setOption)
  const reset = useAvatarStore((s) => s.reset)
  const [activePanel, setActivePanel] = useState(studioPanels[0].id)

  function handleSave() {
    if (onSave) {
      onSave(config)
    } else {
      router.back()
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="lg:order-2">
        <CardContent className="flex flex-col items-center gap-4">
          <AvatarSvg config={config} size={200} />
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={() => reset()}>
              রিসেট করো
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              {saveLabel}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:order-1">
        <CardContent>
          <Tabs value={activePanel} onValueChange={(v) => setActivePanel(v as string)}>
            <TabsList className="h-auto w-full flex-wrap justify-start">
              {studioPanels.map((panel) => (
                <TabsTrigger key={panel.id} value={panel.id}>
                  {panel.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {studioPanels.map((panel) => (
              <TabsContent key={panel.id} value={panel.id} className="mt-4 space-y-4">
                {panel.rows.map((row, i) => (
                  <div key={i} className="space-y-2">
                    {row.title && (
                      <p className="text-sm font-medium text-muted-foreground">{row.title}</p>
                    )}
                    <AvatarOptionGrid
                      category={row.category}
                      config={config}
                      onChange={setOption}
                    />
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
