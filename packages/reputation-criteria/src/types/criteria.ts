export type Provider = "twitter"

export type ParameterName = string
export type ParameterType = "number" | "boolean"
export type ParameterValue = number | boolean | { max?: number; min?: number }

export type Parameters = { name: ParameterName; type: ParameterType }[]

export type Reputation = "gold" | "silver" | "bronze" | "not-sufficient"
export type Rule = { parameter: ParameterName; value: ParameterValue }

export type Reputations = {
    name: Reputation
    rules: Rule[]
}[]

export type Criteria = {
    provider: Provider
    parameters: Parameters
    reputations: Reputations
}
