import type { ReputationLevel, OAuthProvider } from "@interrep/reputation"
import type { Model, Document } from "mongoose"
import type { findByProviderAccountId } from "./OAuthAccount.statics"

export type OAuthAccountData = {
    provider: OAuthProvider
    providerAccountId: string
    reputation: ReputationLevel
    isLinkedToAddress?: boolean
    hasJoinedAGroup?: boolean
    refreshToken?: string
    accessToken?: string
    createdAt?: number
}

export type OAuthAccountDocument = OAuthAccountData & Document

export type OAuthAccountModel = Model<OAuthAccountDocument> & {
    findByProviderAccountId: typeof findByProviderAccountId
}
