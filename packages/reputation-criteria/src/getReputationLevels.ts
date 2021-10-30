import { ReputationLevel } from "./config"

/**
 * Returns all existing reputation levels.
 * @returns The list of reputation levels.
 */
export default function getReputationLevels(): ReputationLevel[] {
    return Object.values(ReputationLevel)
}
