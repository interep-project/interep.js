import twitterCriteria from "./criteria/twitter"
import githubCriteria from "./criteria/github"
import redditCriteria from "./criteria/reddit"
import { Criteria, ReputationLevel, OAuthProvider } from "./types/criteria"
import getOAuthProviders from "./getOAuthProviders"

/**
 * Returns all possible reputation levels of a provider or
 * all existing reputation levels. It is important to return
 * this value in order of importante (GOLD, SILVER, BRONZE, ...).
 * @param provider The provider.
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(provider?: OAuthProvider): ReputationLevel[] {
    if (provider === undefined) {
        return Object.values(ReputationLevel)
    }

    if (!getOAuthProviders().includes(provider)) {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    let criteria: Criteria

    if (provider === OAuthProvider.TWITTER) {
        criteria = twitterCriteria
    } else if (provider === OAuthProvider.GITHUB) {
        criteria = githubCriteria
    } else {
        criteria = redditCriteria
    }

    const reputationLevels = criteria.reputationLevels.map((reputation) => reputation.name)

    reputationLevels.push(ReputationLevel.NOT_SUFFICIENT)

    return reputationLevels
}
