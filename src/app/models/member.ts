
export interface Member {
    id: string
    email: string
    displayName: string
    title: string
    department: string
    avatarUrl: string
    isManager: boolean
    daysOff: number
    availableDays: number
    onPs: boolean
    jiraCardsAssigned: string[]
}
