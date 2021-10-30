import { ReputationLevel } from "../config"

export type TwitterParameters = {
    followers: number
    verifiedProfile: boolean
    botScore?: number
}

export type GithubParameters = {
    followers: number
    receivedStars: number
    proPlan: boolean
}

export type RedditParameters = {
    premiumSubscription: boolean
    karma: number
    coins: number
    linkedIdentities: number
}

export type ProviderParameters = TwitterParameters | GithubParameters | RedditParameters

export type ProviderCriteria<Parameters extends ProviderParameters> = {
    maxValues: Record<keyof Parameters, number>
    reputationThresholds: Record<ReputationLevel, number>
}
