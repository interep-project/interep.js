import type { OAuthProvider } from "@interrep/reputation-criteria"
import type OAuthAccount from "./OAuthAccount.model"
import type { OAuthAccountDocument } from "./OAuthAccount.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByProviderAccountId(
    this: typeof OAuthAccount,
    provider: OAuthProvider,
    providerAccountId: string
): Promise<OAuthAccountDocument | null> {
    return this.findOne({
        provider,
        providerAccountId
    })
}
