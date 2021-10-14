import { Provider, Web2Provider, Web3Provider } from "./types/requestParameters"

export default function checkProvider(provider: Provider) {
    if (
        !Object.values(Web2Provider).includes(provider as Web2Provider) &&
        !Object.values(Web3Provider).includes(provider as Web3Provider)
    ) {
        throw new Error(`Provider '${provider}' not supported`)
    }
}
