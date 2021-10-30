import { ReputationLevel } from "../config"
import { GithubParameters, ProviderCriteria } from "../types"

const githubCriteria: ProviderCriteria<GithubParameters> = {
    maxValues: {
        followers: 1,
        receivedStars: 1,
        proPlan: 1
    },
    reputationThresholds: {
        [ReputationLevel.GOLD]: 12,
        [ReputationLevel.SILVER]: 12,
        [ReputationLevel.BRONZE]: 12
    }
}

export default githubCriteria
