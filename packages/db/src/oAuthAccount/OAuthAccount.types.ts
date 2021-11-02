import type { ReputationLevel, OAuthProvider } from "@interrep/reputation-criteria"
import type { Model, Document } from "mongoose"
import type { findByProviderAccountId } from "./OAuthAccount.statics"

export type OAuthAccountData = {
    provider: OAuthProvider
    providerAccountId: string
    uniqueKey: string
    reputation?: ReputationLevel
    isLinkedToAddress: boolean
    hasJoinedAGroup?: boolean
    refreshToken?: string
    accessToken?: string
    createdAt: number
    updatedAt?: string
    isSeedUser?: boolean
}

export type OAuthAccountDocument = OAuthAccountData & Document

export type OAuthAccountModel = Model<OAuthAccountDocument> & {
    findByProviderAccountId: typeof findByProviderAccountId
}
