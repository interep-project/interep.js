import type { OAuthProvider } from "@interrep/reputation"
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
    }).select({ __v: 0, _id: 0 })
}
