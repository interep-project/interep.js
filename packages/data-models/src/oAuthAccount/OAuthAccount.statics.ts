import { Provider } from "@interrep/reputation-criteria"
import OAuthAccount from "./OAuthAccount.model"
import { OAuthAccountDocument } from "./OAuthAccount.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByProviderAccountId(
    this: typeof OAuthAccount,
    provider: Provider,
    providerAccountId: string
): Promise<OAuthAccountDocument | null> {
    return this.findOne({
        provider,
        providerAccountId
    })
}
