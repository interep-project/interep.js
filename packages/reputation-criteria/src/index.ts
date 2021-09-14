import calculateReputation from "./calculateReputation"
import getReputationLevels from "./getReputationLevels"
import getPlatforms from "./getPlatforms"
import twitterCriteria from "./criteria/twitter"
import githubCriteria from "./criteria/github"

export { calculateReputation, getReputationLevels, getPlatforms, twitterCriteria, githubCriteria }
export * from "./types/criteria"
export * from "./types/platformParameters"
