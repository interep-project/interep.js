import { Provider, Web2Provider, Web3Provider } from "./types/criteria"

/**
 * Returns all existing providers.
 * @returns A list of existing providers.
 */
export default function getProviders(): Provider[] {
    const web3Providers: Provider[] = Object.values(Web3Provider)
    const web2Providers: Provider[] = Object.values(Web2Provider)

    return web2Providers.concat(web3Providers)
}
