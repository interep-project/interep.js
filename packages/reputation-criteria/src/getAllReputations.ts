import twitterCriteria from "./criteria/twitter"
import { Provider } from "./types/criteria"

/**
 *
 */
export default function getAllReputations(provider: Provider): string[] {
    if (provider !== "twitter") {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    const reputations = twitterCriteria.reputations.map(
        (reputation) => `${provider.toUpperCase()}_${reputation.name.toUpperCase()}`
    )

    reputations.push(`${provider.toUpperCase()}_NOT_SUFFICIENT`)

    return reputations
}
