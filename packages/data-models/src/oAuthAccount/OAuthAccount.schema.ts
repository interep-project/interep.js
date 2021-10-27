import { ReputationLevel, Provider } from "@interrep/reputation-criteria"
import { Schema } from "mongoose"
import { findByProviderAccountId } from "./OAuthAccount.statics"
import { OAuthAccountData, OAuthAccountDocument, OAuthAccountModel } from "./OAuthAccount.types"

const Web2AccountSchemaFields: Record<keyof OAuthAccountData, any> = {
    provider: {
        type: String,
        enum: Object.values(Provider),
        required: true
    },
    providerAccountId: { type: String, index: true, required: true },
    uniqueKey: { type: String, index: true, unique: true },
    reputation: { type: String, enum: Object.values(ReputationLevel) },
    isLinkedToAddress: { type: Boolean, required: true },
    hasJoinedAGroup: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now },
    refreshToken: String,
    accessToken: String,
    isSeedUser: { type: Boolean, default: false }
}

const options = { discriminatorKey: "provider" }

const Web2AccountSchema = new Schema<OAuthAccountDocument, OAuthAccountModel>(Web2AccountSchemaFields, options)

Web2AccountSchema.statics.findByProviderAccountId = findByProviderAccountId

export default Web2AccountSchema
