import { ReputationLevel } from "../config"
import { ProviderCriteria, RedditParameters } from "../types"

const redditCriteria: ProviderCriteria<RedditParameters> = {
    maxValues: {
        coins: 1,
        karma: 1,
        linkedIdentities: 1,
        premiumSubscription: 1
    },
    reputationThresholds: {
        [ReputationLevel.GOLD]: 12,
        [ReputationLevel.SILVER]: 12,
        [ReputationLevel.BRONZE]: 12
    }
}

export default redditCriteria
