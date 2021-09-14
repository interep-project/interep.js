import twitterCriteria from "./criteria/twitter"
import githubCriteria from "./criteria/github"
import { Platform, ReputationLevel } from "./types/criteria"
import { PlatformParameters } from "./types/platformParameters"
import getPlatforms from "./getPlatforms"

/**
 * Returns the reputation based on the paramaters.
 * @param platform The platform.
 * @param paramaters The platform parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation(platform: Platform, paramaters: PlatformParameters): ReputationLevel {
    if (!getPlatforms().includes(platform)) {
        throw new Error(`Platform '${platform}' is not supported`)
    }

    const criteria = platform === "twitter" ? twitterCriteria : githubCriteria

    const platformParameterNames = criteria.parameters.map((parameter: any) => parameter.name)
    const platformParameterTypes = criteria.parameters.map((parameter: any) => parameter.type)

    for (const parameterName in paramaters) {
        if (Object.prototype.hasOwnProperty.call(paramaters, parameterName)) {
            const parameterIndex = platformParameterNames.indexOf(parameterName)

            if (parameterIndex === -1) {
                throw new Error(`Parameter '${parameterName}' is not supported`)
            }

            const paramaterValue = paramaters[parameterName as keyof PlatformParameters]
            const expectedType = platformParameterTypes[parameterIndex]

            if (typeof paramaterValue !== expectedType) {
                throw new TypeError(`Parameter '${parameterName}' is not a ${expectedType}`)
            }
        }
    }

    for (const reputation of criteria.reputationLevels) {
        for (const rule of reputation.rules) {
            const parameterValue = paramaters[rule.parameter as keyof PlatformParameters]

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
