export type TwitterParameters = {
    followers?: number
    botometerOverallScore?: number
    verifiedProfile?: boolean
}

export type GithubParameters = {
    followers?: number
    receivedStars?: number
    verifiedProfile?: boolean
}

export type PlatformParameters = TwitterParameters | GithubParameters
