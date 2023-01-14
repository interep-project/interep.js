import getReputationCriteria from "./getReputationCriteria"
import { OAuthProvider, ReputationLevel } from "./types/criteria"
import { ProviderParameters } from "./types/providerParameters"

/**
 * Returns the reputation based on the parameters.
 * @param provider The provider.
 * @param parameters The provider parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation(provider: OAuthProvider, parameters: ProviderParameters): ReputationLevel {
    const criteria = getReputationCriteria(provider)
    const providerParameterNames = criteria.parameters.map((parameter: any) => parameter.name)
    const providerParameterTypes = criteria.parameters.map((parameter: any) => parameter.type)

    for (const parameterName in parameters) {
        if (Object.prototype.hasOwnProperty.call(parameters, parameterName)) {
            const parameterIndex = providerParameterNames.indexOf(parameterName)

            if (parameterIndex === -1) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const parameterValue = parameters[parameterName as keyof ProviderParameters]
            const expectedType = providerParameterTypes[parameterIndex]

            if (typeof parameterValue !== expectedType) {
                throw new TypeError(`Parameter '${parameterName}' is not a ${expectedType}`)
            }
        }
    }

    for (const reputation of criteria.reputationLevels) {
        for (const rule of reputation.rules) {
            if (rule.value !== null) {
                const parameterValue = parameters[rule.parameter as keyof ProviderParameters]

                if (parameterValue !== undefined) {
                    if (typeof rule.value !== "object") {
                        if (parameterValue === rule.value) {
                            return reputation.name
                        }
                    } else if (
                        (rule.value["<"] !== undefined || rule.value[">"] !== undefined) &&
                        (rule.value["<"] === undefined || parameterValue < rule.value["<"]) &&
                        (rule.value[">"] === undefined || parameterValue > rule.value[">"])
                    ) {
                        return reputation.name
                    }
                }
            }
        }
    }

    return ReputationLevel.UNRATED
}
