import { Provider } from "./types/criteria"

/**
 * Returns all existing providers.
 * @returns A list of existing providers.
 */
export default function getProviders(): Provider[] {
    return Object.values(Provider)
}
