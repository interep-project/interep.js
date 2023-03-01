import { Describe, min, number, boolean, object, size } from "superstruct"
import { GithubParameters, RedditParameters, TwitterParameters } from "./types"

export const GhStruct: Describe<GithubParameters> = object({
    receivedStars: min(number(), 0),
    sponsorsCount: min(number(), 0),
    sponsoringCount: min(number(), 0)
})

export const RedditStruct: Describe<RedditParameters> = object({
    totalKarma: min(number(), 0),
    isGold: boolean()
})

export const TwitterStruct: Describe<TwitterParameters> = object({
    followers: min(number(), 0),
    botometerOverallScore: size(number(), 0, 1),
    verifiedProfile: boolean()
})
