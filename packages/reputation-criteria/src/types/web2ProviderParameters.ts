export type TwitterParameters = {
    followers?: number
    botometerOverallScore?: number
    verifiedProfile?: boolean
}

export type GithubParameters = {
    followers?: number
    receivedStars?: number
    proPlan?: boolean
}

export type Web2ProviderParameters = TwitterParameters | GithubParameters
