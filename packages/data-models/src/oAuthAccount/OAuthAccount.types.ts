import type { ReputationLevel, Provider } from "@interrep/reputation-criteria"
import { Model, Document } from "mongoose"
import { findByProviderAccountId } from "./OAuthAccount.statics"

export type OAuthAccountData = {
    provider: Provider
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
