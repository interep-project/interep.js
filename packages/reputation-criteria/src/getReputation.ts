import twitterCriteria from "./criteria/twitter"
import { Provider, Reputation } from "./types/criteria"
import { TwitterParameters } from "./types/platformParameters"

/**
 *
 */
export default function getReputation(provider: Provider, paramaters: TwitterParameters): Reputation {
    if (provider !== "twitter") {
        throw new Error(`Provider '${provider}' is not supported`)
    }

    const twitterParameterNames = twitterCriteria.parameters.map((parameter: any) => parameter.name)
    const twitterParameterTypes = twitterCriteria.parameters.map((parameter: any) => parameter.type)

    for (const parameterName in paramaters) {
        if (Object.prototype.hasOwnProperty.call(paramaters, parameterName)) {
            const parameterIndex = twitterParameterNames.indexOf(parameterName)

            if (parameterIndex === -1) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const paramaterValue = paramaters[parameterName as keyof TwitterParameters]
            const expectedType = twitterParameterTypes[parameterIndex]

            if (typeof paramaterValue !== expectedType) {
                throw new TypeError(`Parameter '${parameterName}' is not a ${expectedType}`)
            }
        }
    }

    for (const reputation of twitterCriteria.reputations) {
        for (const rule of reputation.rules) {
            const parameterValue = paramaters[rule.parameter as keyof TwitterParameters]

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

    return Reputation.NOT_SUFFICIENT
}
