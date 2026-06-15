import { notFound } from "next/navigation"
import { ChallengeEngine } from "@/components/challenge/challenge-engine"
import { topics } from "@/lib/mock/subjects"
import { getQuestionsByTopic } from "@/lib/utils/challenge"

export default async function ChallengeTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params
  const topicIds = topicId.split("+")
  const selectedTopics = topicIds.map((id) => topics.find((t) => t.id === id)).filter((t) => t !== undefined)

  if (selectedTopics.length === 0) {
    notFound()
  }

  const questions = selectedTopics.flatMap((topic) => getQuestionsByTopic(topic.name))

  if (questions.length === 0) {
    notFound()
  }

  return <ChallengeEngine topicId={topicId} subjectId={selectedTopics[0].subjectId} questions={questions} />
}
