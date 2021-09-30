import { Web2Provider } from "./types/criteria"

/**
 * Returns all existing providers.
 * @returns A list of existing providers.
 */
export default function getProviders(): Web2Provider[] {
    return Object.values(Web2Provider)
}
