import { ReputationLevel, OAuthProvider } from "@interrep/reputation"
import { Schema } from "mongoose"
import { findByProviderAccountId } from "./OAuthAccount.statics"
import type { OAuthAccountData, OAuthAccountDocument, OAuthAccountModel } from "./OAuthAccount.types"

const OAuthAccountSchemaFields: Record<keyof OAuthAccountData, any> = {
    provider: { type: String, enum: Object.values(OAuthProvider), required: true },
    providerAccountId: { type: String, index: true, required: true },
    reputation: { type: String, enum: Object.values(ReputationLevel), required: true },
    isLinkedToAddress: { type: Boolean, default: false },
    hasJoinedAGroup: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    refreshToken: String,
    accessToken: String
}

const OAuthAccountSchema = new Schema<OAuthAccountDocument, OAuthAccountModel>(OAuthAccountSchemaFields)

OAuthAccountSchema.statics.findByProviderAccountId = findByProviderAccountId

export default OAuthAccountSchema
