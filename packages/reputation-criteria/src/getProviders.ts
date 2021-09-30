import { Provider, Web2Provider, Web3Provider } from "./types/criteria"

/**
 * Returns all existing providers.
 * @returns A list of existing providers.
 */
export default function getProviders(): Provider[] {
    return [...Object.values(Web2Provider), ...Object.values(Web3Provider)]
}
