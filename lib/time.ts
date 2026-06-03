export function formatDistanceToNow(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes} মিনিট আগে`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ঘন্টা আগে`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} দিন আগে`
  return new Date(dateStr).toLocaleDateString("bn-BD")
}
