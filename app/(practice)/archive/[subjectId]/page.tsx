import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ArchiveExamList } from "@/components/archive/archive-exam-list"
import { ArchiveNodeGrid } from "@/components/archive/archive-node-grid"
import { subjects } from "@/lib/mock/subjects"
import {
  archiveExamsBySubjectFallback,
  getArchiveExamById,
  getArchiveExamsForNode,
  getArchiveNodeById,
  getArchiveNodeChildren,
} from "@/lib/mock/archive"

export default async function ArchiveSubjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ subjectId: string }>
  searchParams: Promise<{ node?: string }>
}) {
  const { subjectId } = await params
  const { node: nodeId } = await searchParams
  const subject = subjects.find((s) => s.id === subjectId)

  if (!subject) {
    notFound()
  }

  const currentNode = nodeId ? getArchiveNodeById(nodeId) : undefined
  if (nodeId && !currentNode) {
    notFound()
  }

  const children = getArchiveNodeChildren(subject.id, currentNode?.id)

  const backHref = currentNode
    ? currentNode.parentId
      ? `/archive/${subject.id}?node=${currentNode.parentId}`
      : `/archive/${subject.id}`
    : "/archive"
  const backLabel = currentNode ? "শ্রেণী নির্বাচনে ফিরে যাও" : "বিষয় নির্বাচনে ফিরে যাও"
  const title = currentNode ? currentNode.name : subject.name

  let content
  if (children.length > 0) {
    content = <ArchiveNodeGrid subjectId={subject.id} nodes={children} />
  } else if (currentNode) {
    content = <ArchiveExamList exams={getArchiveExamsForNode(currentNode)} />
  } else {
    const fallbackIds = archiveExamsBySubjectFallback[subject.id] ?? []
    content = (
      <ArchiveExamList
        exams={fallbackIds.map(getArchiveExamById).filter((exam): exam is NonNullable<typeof exam> => !!exam)}
      />
    )
  }

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <Link href={backHref} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        {backLabel}
      </Link>
      <h2 className="text-lg font-semibold">{title}</h2>
      {content}
    </div>
  )
}
