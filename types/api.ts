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
    username: string;
    password: string;
}

/** Mirrors mobile's `RegisterProfileRequestModel` — sent as `config`. */
export interface RegisterConfigDto {
    classId: string;
    groupId?: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    config?: RegisterConfigDto;
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
    id: number;
    username: string;
    name: string;
    email: string;
    token: string;
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
    avatarStyle?: string;
    hairType?: string;
    hairColor?: string;
    headwearType?: string;
    hatColor?: string;
    accessoriesType?: string;
    glassesColor?: string;
    facialHairType?: string;
    facialHairColor?: string;
    clotheType?: string;
    clotheColor?: string;
    graphicType?: string;
    eyeType?: string;
    eyebrowType?: string;
    mouthType?: string;
    skinColor?: string;
    backgroundColor?: string;
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
    iconUrl?: string;
    masteredCount: number;
    totalQuestions: number;
}

export function subjectMasteryPercent(item: SubjectMasteryDto): number {
    return item.totalQuestions > 0
        ? Math.round((item.masteredCount / item.totalQuestions) * 100)
        : 0;
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
    subTitle?: string;
    imageUrl?: string;
    iconUrl?: string;
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

// ─── Presets ─────────────────────────────────────────────────────────────────

export interface PresetSubjectDto {
    id: number;
    name: string;
    marks: number;
}

export interface PresetDto {
    id: number;
    name: string;
    order?: number;
    durationInMinutes: number;
    subjects: PresetSubjectDto[];
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
    subjectId?: string;
    subjectName?: string;
    questions: QuestionDto[];
    duration?: number;
}

export interface QuestionDto {
    id: string;
    text: string;
    options: OptionDto[];
    explanation?: string;
    subjectId?: string;
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

export const QuizType = {
    Mock: 1,
    Quiz: 2,
    Archive: 3,
    Plan: 4,
} as const;

export type QuizTypeValue = (typeof QuizType)[keyof typeof QuizType];

export interface QuizSubmissionItemDto {
    qId: string;
    opId: string;
}

export interface UserQuizSubmissionDto {
    quizType: QuizTypeValue;
    quizId: string;
    subjectId: string;
    durationSeconds: number;
    submissions: QuizSubmissionItemDto[];
    lessonId?: string;
}

export interface UserQuizResultDto {
    userQuizId?: string;
    totalXp: number;
    earnedXp: number;
    totalQuestions: number;
    correctAnswer: number;
    percentage: number;
    streak: number;
    marks?: number;
}

// ─── Archive ─────────────────────────────────────────────────────────────────

export interface ArchiveExamListItem {
    id: string;
    name: string;
    classId: string;
    subjectId: string;
    instituteId: string;
    year: number;
}

export interface ArchiveOptionDto {
    id: string;
    name: string;
    isCorrect: boolean;
}

export interface ArchiveQuestionDto {
    id: string;
    name: string;
    passage?: string;
    explanation?: string;
    options: ArchiveOptionDto[];
}

export interface ArchiveExamDto extends ArchiveExamListItem {
    questions: ArchiveQuestionDto[];
}

export interface UserQuizHistoryDto {
    id: string;
    quizId?: string;
    quizTitle?: string;
    subjectName?: string;
    quizType?: string;
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
    // Rich fields from mobile MonthlyStreakModel
    activeDays: number[];
    frozenDays: number[];
    longestStreak: number;
    totalActiveDays: number;
    weekActiveDays: number;
    activeStreak: number;
    // Legacy flat-array format (kept for backward compat)
    days?: StreakDayDto[];
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
    dailyMinutes?: number;
    items: StudyPlanItemDto[];
}

export interface StudyPlanItemDto {
    id: string;
    lessonId: string;
    lessonName: string;
    subjectId?: number;
    subjectName?: string;
    dayNumber?: number;
    order?: number;
    status?: number;
    estimatedMinutes: number;
    isCompleted: boolean;
    masteryPercent?: number;
}

/** Payload item for POST /study-plans/save (matches backend CreateStudyPlanVm). */
export interface SaveStudyPlanItemDto {
    lessonId: number;
    subjectId: number;
    dayNumber: number;
    dailyMinutes: number;
    order: number;
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
    segment?: number;
    classId?: number;
    className?: string;
    groupId?: number;
    groupName?: string;
    enableNotifications?: boolean;
    notifyStreakReminder?: boolean;
    notifyDailyPractice?: boolean;
    notifyQuizAvailable?: boolean;
    notifyAchievements?: boolean;
    notifyNewContent?: boolean;
    preferredNotificationHour?: number;
    soundEnabled?: boolean;
    soundCorrectVariant?: number;
    soundWrongVariant?: number;
    soundCelebrationVariant?: number;
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

// ─── Profile / User Details ───────────────────────────────────────────────────

export interface DailyProgressDto {
    day: string;
    xp: number;
}

export interface CompareProgressDto {
    me: DailyProgressDto[];
    friend: DailyProgressDto[];
}

export interface UserDetailsDto extends UserDto {
    username: string;
    following: number;
    followers: number;
    streak: number;
    totalXp: number;
    weekXp: number;
    streakActive: boolean;
    percentage: number;
    quizCount: number;
    weeklyXp: CompareProgressDto;
    isPremium: boolean;
    coin: number;
    leagueId: number;
    leagueName: string;
    leagueImageUrl?: string;
    isFollowing: boolean;
}
