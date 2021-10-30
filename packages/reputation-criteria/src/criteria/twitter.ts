import { ReputationLevel } from "../config"
import { ProviderCriteria, TwitterParameters } from "../types"

const twitterCriteria: ProviderCriteria<TwitterParameters> = {
    maxValues: {
        botScore: 1,
        followers: 1,
        verifiedProfile: 1
    },
    reputationThresholds: {
        [ReputationLevel.GOLD]: 12,
        [ReputationLevel.SILVER]: 12,
        [ReputationLevel.BRONZE]: 12
    }
}

export default twitterCriteria
