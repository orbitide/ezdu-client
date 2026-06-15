import { notFound } from "next/navigation"
import { ChallengeEngine } from "@/components/challenge/challenge-engine"
import { topics } from "@/lib/mock/subjects"
import { getQuestionsByTopic } from "@/lib/utils/challenge"

export default async function ChallengeTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params
  const topic = topics.find((t) => t.id === topicId)

  if (!topic) {
    notFound()
  }

  const questions = getQuestionsByTopic(topic.name)

  if (questions.length === 0) {
    notFound()
  }

  return <ChallengeEngine topicId={topic.id} subjectId={topic.subjectId} questions={questions} />
}
