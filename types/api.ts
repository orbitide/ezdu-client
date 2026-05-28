// API response types matching the .NET backend DTOs

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface PagedList<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface GoogleLoginDto {
    idToken: string;
}

export interface SendOtpDto {
    email: string;
}

export interface VerifyOtpDto {
    email: string;
    otp: string;
    name?: string;
    password?: string;
}

export interface ChangePasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}

export interface AuthResponseDto {
    token: string;
    user: UserDto;
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserDto {
    id: string;
    name: string;
    email: string;
    username?: string;
    phone?: string;
    bio?: string;
    avatarConfig?: AvatarConfig;
    classId?: string;
    className?: string;
    groupId?: string;
    groupName?: string;
    createdAt: string;
}

export interface AvatarConfig {
    hair?: string;
    hairColor?: string;
    eyes?: string;
    eyebrows?: string;
    nose?: string;
    mouth?: string;
    beard?: string;
    glasses?: string;
    hat?: string;
    top?: string;
    topColor?: string;
    pants?: string;
    pantsColor?: string;
    shoes?: string;
    shoesColor?: string;
    skin?: string;
    bg?: string;
    bgColor?: string;
}

export interface UserStatsDto {
    xp: number;
    streak: number;
    totalQuizzes: number;
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    rank?: number;
    coins?: number;
}

export interface SubjectMasteryDto {
    subjectId: string;
    subjectName: string;
    masteryPercent: number;
    totalLessons: number;
    masteredLessons: number;
}

export interface UpdateUserDto {
    name?: string;
    phone?: string;
    bio?: string;
}

// ─── Classes & Groups ────────────────────────────────────────────────────────

export interface ClassDto {
    id: string;
    name: string;
    displayName: string;
    order?: number;
}

export interface GroupDto {
    id: string;
    name: string;
    displayName: string;
    classId: string;
}

// ─── Subjects, Lessons, Topics ───────────────────────────────────────────────

export interface SubjectDto {
    id: string;
    name: string;
    classId: string;
    groupId?: string;
    lessonCount?: number;
    questionCount?: number;
}

export interface LessonDto {
    id: string;
    name: string;
    subjectId: string;
    subjectName?: string;
    topicCount?: number;
    questionCount?: number;
}

export interface LessonWithTopicsDto extends LessonDto {
    topics: TopicDto[];
}

export interface TopicDto {
    id: string;
    name: string;
    lessonId: string;
    questionCount?: number;
}

// ─── Quiz ────────────────────────────────────────────────────────────────────

export interface QuizListDto {
    id: string;
    title: string;
    subjectId?: string;
    subjectName?: string;
    questionCount: number;
    duration?: number;
    difficulty?: string;
    scheduledAt?: string;
    isCompleted?: boolean;
}

export interface QuizDetailsDto {
    id: string;
    title: string;
    subjectName?: string;
    questions: QuestionDto[];
    duration?: number;
}

export interface QuestionDto {
    id: string;
    text: string;
    options: OptionDto[];
    explanation?: string;
    subjectName?: string;
    topicName?: string;
    difficulty?: string;
}

export interface OptionDto {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface SaveUserQuizDto {
    quizId?: string;
    subjectId?: string;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    skippedQuestions: number;
    timeTaken: number;
    xpEarned: number;
    submittedAnswers: SubmittedAnswerDto[];
}

export interface SubmittedAnswerDto {
    questionId: string;
    selectedOptionId: string | null;
    isCorrect: boolean;
}

export interface UserQuizHistoryDto {
    id: string;
    quizId?: string;
    quizTitle?: string;
    subjectName?: string;
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    xpEarned: number;
    completedAt: string;
}

export interface UserQuizReviewDto {
    id: string;
    quizTitle?: string;
    questions: ReviewQuestionDto[];
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: number;
    completedAt: string;
}

export interface ReviewQuestionDto extends QuestionDto {
    selectedOptionId: string | null;
    isCorrect: boolean;
}

// ─── Progress ────────────────────────────────────────────────────────────────

export interface ProgressDto {
    totalXp: number;
    streak: number;
    totalQuizzes: number;
    accuracy: number;
    weakSubjects: WeakSubjectDto[];
    recentActivity: RecentActivityDto[];
}

export interface WeakSubjectDto {
    subjectId: string;
    subjectName: string;
    accuracy: number;
    questionsAttempted: number;
}

export interface RecentActivityDto {
    date: string;
    xpEarned: number;
    questionsAnswered: number;
}

export interface MonthlyStreakDto {
    year: number;
    month: number;
    days: StreakDayDto[];
}

export interface StreakDayDto {
    day: number;
    hasActivity: boolean;
    xpEarned?: number;
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntryDto {
    rank: number;
    userId: string;
    name: string;
    avatarConfig?: AvatarConfig;
    xp: number;
    streak: number;
    isCurrentUser?: boolean;
}

export interface ClassRankDto {
    rank: number;
    totalUsers: number;
    xp: number;
}

// ─── Study Plan ──────────────────────────────────────────────────────────────

export interface StudyPlanDto {
    id: string;
    title: string;
    mode: 'manual' | 'auto';
    status: 'active' | 'completed' | 'expired';
    startDate: string;
    endDate: string;
    totalItems: number;
    completedItems: number;
    days: StudyPlanDayDto[];
}

export interface StudyPlanDayDto {
    dayNumber: number;
    date: string;
    items: StudyPlanItemDto[];
}

export interface StudyPlanItemDto {
    id: string;
    lessonId: string;
    lessonName: string;
    subjectName?: string;
    estimatedMinutes: number;
    isCompleted: boolean;
}

export interface CreateStudyPlanDto {
    mode: 'manual' | 'auto';
    durationDays: number;
    dailyMinutes: number;
    lessonIds?: string[];
}

// ─── Vocabulary ───────────────────────────────────────────────────────────────

export interface VocabularyDto {
    id: string;
    word: string;
    definition: string;
    banglaDefinition?: string;
    exampleSentence?: string;
    synonyms: string[];
    antonyms: string[];
    difficulty: 'easy' | 'medium' | 'advanced' | 'competitive';
}

// ─── User Config ─────────────────────────────────────────────────────────────

export interface UserConfigDto {
    classId?: string;
    groupId?: string;
    isOnboarded: boolean;
    notifyStreak: boolean;
    notifyDailyPractice: boolean;
    notifyAchievements: boolean;
    soundEnabled: boolean;
    language: 'en' | 'bn';
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export interface DailyRevisionDto {
    weakLessonCount: number;
    questions: QuestionDto[];
}

export interface RecommendationDto {
    suggestedQuizzes: QuizListDto[];
    dailyRevision: DailyRevisionDto | null;
}

// ─── Feed ────────────────────────────────────────────────────────────────────

export interface FeedItemDto {
    id: string;
    type: 'achievement' | 'announcement' | 'notification' | 'friendActivity';
    title: string;
    body: string;
    imageUrl?: string;
    createdAt: string;
}

// ─── Social ──────────────────────────────────────────────────────────────────

export interface FriendDto {
    userId: string;
    name: string;
    avatarConfig?: AvatarConfig;
    xp: number;
    streak: number;
}

// ─── Achievements ────────────────────────────────────────────────────────────

export interface AchievementDto {
    id: string;
    name: string;
    description: string;
    icon: string;
    isEarned: boolean;
    earnedAt?: string;
    progress?: number;
    target?: number;
}
