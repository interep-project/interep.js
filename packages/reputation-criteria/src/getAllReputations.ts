import twitterCriteria from "./criteria/twitter"
import { Provider, Reputation } from "./types/criteria"

/**
 *
 */
export default function getAllReputations(provider: Provider): Reputation[] {
    if (provider !== "twitter") {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    const reputations = twitterCriteria.reputations.map((reputation) => reputation.name)

    reputations.push(Reputation.NOT_SUFFICIENT)

    return reputations
}
