import twitterCriteria from "./criteria/twitter"
import { Platform, ReputationLevel } from "./types/criteria"
import getPlatforms from "./getPlatforms"

/**
 * Returns all possible reputation levels of a platform or
 * all existing reputation levels.
 * @param platform The platform.
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(platform?: Platform): ReputationLevel[] {
    if (platform === undefined) {
        return Object.values(ReputationLevel)
    }

    if (!getPlatforms().includes(platform)) {
        throw new Error(`Platform '${platform}' is not supported`)
    }

    const reputationLevels = twitterCriteria.reputationLevels.map((reputation) => reputation.name)

    reputationLevels.push(ReputationLevel.NOT_SUFFICIENT)

    return reputationLevels
}
