export enum Web2Provider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}

export enum Web3Provider {
    POAP = "poap"
}

export type Provider = Web2Provider | Web3Provider

export type ParameterName = string
export type ParameterType = "number" | "boolean"
export type ParameterValue = number | boolean | { max?: number; min?: number }

export type Parameters = { name: ParameterName; type: ParameterType }[]

export enum ReputationLevel {
    GOLD = "GOLD",
    SILVER = "SILVER",
    BRONZE = "BRONZE",
    NOT_SUFFICIENT = "NOT_SUFFICIENT"
}

export type Rule = { parameter: ParameterName; value: ParameterValue }

export type ReputationLevels = {
    name: ReputationLevel
    rules: Rule[]
}[]

export type Criteria = {
    provider: Provider
    parameters: Parameters
    reputationLevels: ReputationLevels
}
