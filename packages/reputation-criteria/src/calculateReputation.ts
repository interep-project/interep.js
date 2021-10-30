import { ReputationLevel, OAuthProvider } from "./config"
import githubCriteria from "./criteria/github"
import redditCriteria from "./criteria/reddit"
import twitterCriteria from "./criteria/twitter"
import getOAuthProviders from "./getOAuthProviders"
import { ProviderCriteria, ProviderParameters } from "./types"

/**
 * Returns the reputation based on the parameters.
 * @param oAuthProvider The provider.
 * @param parameters The provider parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation<Parameters extends ProviderParameters>(
    oAuthProvider: OAuthProvider,
    parameters: Parameters
): ReputationLevel {
    if (!getOAuthProviders().includes(oAuthProvider)) {
        throw new Error(`Provider '${oAuthProvider}' is not supported`)
    }

    let providerCriteria: ProviderCriteria<ProviderParameters>

    if (oAuthProvider === OAuthProvider.TWITTER) {
        providerCriteria = twitterCriteria
    } else if (oAuthProvider === OAuthProvider.GITHUB) {
        providerCriteria = githubCriteria
    } else {
        providerCriteria = redditCriteria
    }

    // Max values and reputation thresholds.
    const { maxValues, reputationThresholds } = providerCriteria

    // Type check.
    for (const parameterName in parameters) {
        if (Object.prototype.hasOwnProperty.call(parameters, parameterName)) {
            if (!Object.prototype.hasOwnProperty.call(maxValues, parameterName)) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const parameterValue = parameters[parameterName as keyof ProviderParameters]

            if (typeof parameterValue !== "number" && typeof parameterValue !== "boolean") {
                throw new Error(`Parameter values must be numbers or booleans`)
            }
        }
    }

    // Here the function to calculate reputation.
    console.log(maxValues, reputationThresholds)

    return ReputationLevel.BRONZE
}
