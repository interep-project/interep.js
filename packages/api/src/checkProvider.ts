// eslint-disable-next-line import/no-extraneous-dependencies
import { OAuthProvider } from "@interep/reputation"
import { Provider } from "./types/requestParameters"

export default function checkProvider(provider: Provider) {
    if (
        !Object.values(OAuthProvider).includes(provider as OAuthProvider) &&
        provider !== "poap" &&
        provider !== "telegram" &&
        provider !== "email"
    ) {
        throw new Error(`Provider '${provider}' not supported`)
    }
}
