// eslint-disable-next-line import/no-extraneous-dependencies
import { OAuthProvider } from "@interep/reputation"
import { Provider, Web3Provider } from "./types/requestParameters"

export default function checkProvider(provider: Provider) {
    if (
        !Object.values(OAuthProvider).includes(provider as OAuthProvider) &&
        !Object.values(Web3Provider).includes(provider as Web3Provider) &&
        provider !== "telegram" &&
        provider !== "email"
    ) {
        throw new Error(`Provider '${provider}' not supported`)
    }
}
