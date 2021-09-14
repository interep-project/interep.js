import { Platform } from "./types/criteria"

/**
 * Returns all existing platforms.
 * @returns A list of existing platforms.
 */
export default function getPlatforms(): Platform[] {
    return Object.values(Platform)
}
