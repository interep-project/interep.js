export enum OAuthProvider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}

export type ReputationParameterName = string
export type ReputationParameterType = "number" | "boolean"
export type ReputationParameterValue = number | boolean | { max?: number; min?: number }

export type ReputationParameters = { name: ReputationParameterName; type: ReputationParameterType }[]

export enum ReputationLevel {
    GOLD = "gold",
    SILVER = "silver",
    BRONZE = "bronze"
}

export type ReputationRule = { parameter: ReputationParameterName; value: ReputationParameterValue }

export type ReputationLevels = {
    name: ReputationLevel
    rules: ReputationRule[]
}[]

export type ReputationCriteria = {
    provider: OAuthProvider
    parameters: ReputationParameters
    reputationLevels: ReputationLevels
}
