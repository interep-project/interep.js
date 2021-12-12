export enum OAuthProvider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}

export type ParameterName = string
export type ParameterType = "number" | "boolean"
export type ParameterValue = number | boolean | { max?: number; min?: number }

export type Parameters = { name: ParameterName; type: ParameterType }[]

export enum ReputationLevel {
    GOLD = "gold",
    SILVER = "silver",
    BRONZE = "bronze",
    NOT_SUFFICIENT = "not_sufficient"
}

export type Rule = { parameter: ParameterName; value: ParameterValue }

export type ReputationLevels = {
    name: ReputationLevel
    rules: Rule[]
}[]

export type Criteria = {
    provider: OAuthProvider
    parameters: Parameters
    reputationLevels: ReputationLevels
}
