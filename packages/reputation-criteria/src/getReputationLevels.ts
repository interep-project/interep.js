import twitterCriteria from "./criteria/twitter"
import githubCriteria from "./criteria/github"
import redditCriteria from "./criteria/reddit"
import { Criteria, ReputationLevel, Web2Provider } from "./types/criteria"
import getProviders from "./getProviders"

/**
 * Returns all possible reputation levels of a provider or
 * all existing reputation levels. It is important to return
 * this value in order of importante (GOLD, SILVER, BRONZE, ...).
 * @param web2Provider The provider.
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(web2Provider?: Web2Provider): ReputationLevel[] {
    if (web2Provider === undefined) {
        return Object.values(ReputationLevel)
    }

    if (!getProviders().includes(web2Provider)) {
        throw new Error(`Provider '${web2Provider}' is not supported`)
    }

    let criteria: Criteria

    if (web2Provider === Web2Provider.TWITTER) {
        criteria = twitterCriteria
    } else if (web2Provider === Web2Provider.GITHUB) {
        criteria = githubCriteria
    } else {
        criteria = redditCriteria
    }

    const reputationLevels = criteria.reputationLevels.map((reputation) => reputation.name)

    reputationLevels.push(ReputationLevel.NOT_SUFFICIENT)

    return reputationLevels
}
