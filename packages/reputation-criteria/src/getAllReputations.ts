import twitterCriteria from "./criteria/twitter"
import { Provider } from "./types/criteria"

/**
 *
 */
export default function getAllReputations(provider: Provider): string[] {
    if (provider !== "twitter") {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    return [
        ...twitterCriteria.reputations.map(
            (reputation) => `${provider.toUpperCase()}_${reputation.name.toUpperCase()}`
        ),
        `${provider.toUpperCase()}_NOT_SUFFICIENT`
    ]
}
