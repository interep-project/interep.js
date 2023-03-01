export enum OAuthProvider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}

export type TwitterParameters = {
    followers: number
    botometerOverallScore: number // cap_universal
    verifiedProfile: boolean
}

export type GithubParameters = {
    receivedStars: number
    sponsorsCount: number
    sponsoringCount: number
}

export type RedditParameters = {
    totalKarma: number
    isGold: boolean
}

export type ProviderParameters = TwitterParameters | GithubParameters | RedditParameters
