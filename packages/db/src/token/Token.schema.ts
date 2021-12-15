import { OAuthProvider } from "@interrep/reputation"
import { Schema } from "mongoose"
import { findByUserAddress } from "./Token.statics"
import { TokenData, TokenDocument, TokenModel, TokenStatus } from "./Token.types"

const TokenSchemaFields: Record<keyof TokenData, any> = {
    tokenId: { type: String, index: true, required: true },
    provider: {
        type: String,
        enum: Object.values(OAuthProvider),
        required: true
    },
    userAddress: { type: String, index: true, required: true },
    encryptedAttestation: { type: String, required: true },
    status: { type: String, enum: Object.values(TokenStatus) },
    transaction: {
        hash: String,
        blockNumber: Number
    }
}

const UserSchema = new Schema<TokenDocument, TokenModel>(TokenSchemaFields)

UserSchema.statics.findByUserAddress = findByUserAddress

export default UserSchema
