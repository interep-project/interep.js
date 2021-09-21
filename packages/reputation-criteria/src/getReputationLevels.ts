import twitterCriteria from "./criteria/twitter"
import { Web2Provider, ReputationLevel } from "./types/criteria"
import getWeb2Providers from "./getWeb2Providers"

/**
 * Returns all possible reputation levels of a Web2 provider or
 * all existing reputation levels. It is important to return
 * this value in order of importante (GOLD, SILVER, BRONZE, ...).
 * @param web2provider The Web2 provider.
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(web2Provider?: Web2Provider): ReputationLevel[] {
    if (web2Provider === undefined) {
        return Object.values(ReputationLevel)
    }

    if (!getWeb2Providers().includes(web2Provider)) {
        throw new Error(`Web2 provider '${web2Provider}' is not supported`)
    }

    const reputationLevels = twitterCriteria.reputationLevels.map((reputation) => reputation.name)

    reputationLevels.push(ReputationLevel.NOT_SUFFICIENT)

    return reputationLevels
}
