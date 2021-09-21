import { Web2Provider } from "./types/criteria"

/**
 * Returns all existing Web2 providers.
 * @returns A list of existing Web2 providers.
 */
export default function getWeb2Providers(): Web2Provider[] {
    return Object.values(Web2Provider)
}
