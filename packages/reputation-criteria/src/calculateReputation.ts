import twitterCriteria from "./criteria/twitter"
import githubCriteria from "./criteria/github"
import { Web2Provider, ReputationLevel } from "./types/criteria"
import { Web2ProviderParameters } from "./types/web2ProviderParameters"
import getWeb2Providers from "./getWeb2Providers"

/**
 * Returns the reputation based on the paramaters.
 * @param web2Provider The Web2 provider.
 * @param paramaters The Web2 provider parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation(
    web2Provider: Web2Provider,
    paramaters: Web2ProviderParameters
): ReputationLevel {
    if (!getWeb2Providers().includes(web2Provider)) {
        throw new Error(`Web2 provider '${web2Provider}' is not supported`)
    }

    const criteria = web2Provider === "twitter" ? twitterCriteria : githubCriteria

    const providerParameterNames = criteria.parameters.map((parameter: any) => parameter.name)
    const providerParameterTypes = criteria.parameters.map((parameter: any) => parameter.type)

    for (const parameterName in paramaters) {
        if (Object.prototype.hasOwnProperty.call(paramaters, parameterName)) {
            const parameterIndex = providerParameterNames.indexOf(parameterName)

            if (parameterIndex === -1) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const paramaterValue = paramaters[parameterName as keyof Web2ProviderParameters]
            const expectedType = providerParameterTypes[parameterIndex]

            if (typeof paramaterValue !== expectedType) {
                throw new TypeError(`Parameter '${parameterName}' is not a ${expectedType}`)
            }
        }
    }

    for (const reputation of criteria.reputationLevels) {
        for (const rule of reputation.rules) {
            const parameterValue = paramaters[rule.parameter as keyof Web2ProviderParameters]

            if (parameterValue !== undefined) {
                if (typeof rule.value !== "object") {
                    if (parameterValue === rule.value) {
                        return reputation.name
                    }
                } else if (
                    (rule.value.max !== undefined || rule.value.min !== undefined) &&
                    (rule.value.max === undefined || parameterValue <= rule.value.max) &&
                    (rule.value.min === undefined || parameterValue >= rule.value.min)
                ) {
                    return reputation.name
                }
            }
        }
    }

    return ReputationLevel.NOT_SUFFICIENT
}
