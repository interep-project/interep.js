import getReputationCriteria from "./getReputationCriteria"
import { OAuthProvider, ReputationLevel } from "./types/criteria"
import { ProviderParameters } from "./types/providerParameters"

/**
 * Returns the reputation based on the parameters.
 * @param provider The provider.
 * @param paramaters The provider parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation(provider: OAuthProvider, paramaters: ProviderParameters): ReputationLevel {
    const criteria = getReputationCriteria(provider)
    const providerParameterNames = criteria.parameters.map((parameter: any) => parameter.name)
    const providerParameterTypes = criteria.parameters.map((parameter: any) => parameter.type)

    for (const parameterName in paramaters) {
        if (Object.prototype.hasOwnProperty.call(paramaters, parameterName)) {
            const parameterIndex = providerParameterNames.indexOf(parameterName)

            if (parameterIndex === -1) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const paramaterValue = paramaters[parameterName as keyof ProviderParameters]
            const expectedType = providerParameterTypes[parameterIndex]

            if (typeof paramaterValue !== expectedType) {
                throw new TypeError(`Parameter '${parameterName}' is not a ${expectedType}`)
            }
        }
    }

    for (const reputation of criteria.reputationLevels) {
        for (const rule of reputation.rules) {
            const parameterValue = paramaters[rule.parameter as keyof ProviderParameters]

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

    throw new Error("Parameters do not meet any reputation criteria")
}
