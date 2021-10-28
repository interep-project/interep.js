import { OAuthProvider } from "@interrep/reputation-criteria"
import { Schema } from "mongoose"
import { TransactionSchema } from "../transaction/Transaction.schema"
import { findByUserAddress } from "./Token.statics"
import { TokenData, TokenDocument, TokenModel, TokenStatus } from "./Token.types"

const TokenSchemaFields: Record<keyof TokenData, any> = {
    chainId: { type: Number, required: true },
    contractAddress: { type: String, required: true },
    userAddress: { type: String, index: true },
    issuanceTimestamp: { type: Date, required: true },
    encryptedAttestation: { type: String, required: true },
    decimalId: { type: String, index: true, required: true },
    status: { type: String, enum: Object.values(TokenStatus), required: true },
    mintTransactions: [TransactionSchema],
    provider: {
        type: String,
        enum: Object.values(OAuthProvider),
        required: true
    }
}

const UserSchema = new Schema<TokenDocument, TokenModel>(TokenSchemaFields)

UserSchema.statics.findByUserAddress = findByUserAddress

export default UserSchema
