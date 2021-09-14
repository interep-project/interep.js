import twitterCriteria from "./criteria/twitter"
import { Provider, ReputationLevel } from "./types/criteria"
import getProviders from "./getProviders"

/**
 * Returns all possible reputation levels of a provider or
 * all existing reputation levels.
 * @param provider The provider.
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(provider?: Provider): ReputationLevel[] {
    if (provider === undefined) {
        return Object.values(ReputationLevel)
    }

    if (!getProviders().includes(provider)) {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    const reputationLevels = twitterCriteria.reputationLevels.map((reputation) => reputation.name)

    reputationLevels.push(ReputationLevel.NOT_SUFFICIENT)

    return reputationLevels
}
