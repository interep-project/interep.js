import { ReputationLevel } from "./types"

/**
 * Returns all the reputation levels (gold, silver, bronze).
 * @returns A list of reputation levels.
 */
export default function getReputationLevels(): ReputationLevel[] {
    return Object.values(ReputationLevel)
}
