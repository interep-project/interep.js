import { assert } from "superstruct"
import { OAuthProvider, GithubParameters, ProviderParameters, RedditParameters, TwitterParameters } from "./types"
import criteria from "./criteria"
import { GhStruct, RedditStruct, TwitterStruct } from "./structs"

/**
 * Returns the reputation based on the parameters.
 * @param provider The provider.
 * @param parameters The provider parameters to check.
 * @returns The reputation level found.
 */
// eslint-disable-next-line consistent-return
const calculateReputation = (provider: OAuthProvider, parameters: ProviderParameters) => {
    if (!Object.values(OAuthProvider).includes(provider)) throw new Error(`Provider '${provider}' is not supported`)

    if (provider === OAuthProvider.GITHUB) {
        assert(parameters, GhStruct)
        const { receivedStars, sponsorsCount, sponsoringCount } = parameters as GithubParameters
        return criteria[OAuthProvider.GITHUB](receivedStars, sponsorsCount + sponsoringCount)
    }

    if (provider === OAuthProvider.REDDIT) {
        assert(parameters, RedditStruct)
        const { totalKarma, isGold } = parameters as RedditParameters
        return criteria[OAuthProvider.REDDIT](totalKarma, isGold)
    }

    if (provider === OAuthProvider.TWITTER) {
        assert(parameters, TwitterStruct)
        const { followers, verifiedProfile, botometerOverallScore } = parameters as TwitterParameters
        if (botometerOverallScore >= 0.95) throw new Error("You are a bot!")
        return criteria[OAuthProvider.TWITTER](followers, verifiedProfile)
    }
}

export default calculateReputation
