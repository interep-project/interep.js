import type { OAuthProvider } from "@interrep/reputation"
import type { Document, Model } from "mongoose"
import type { findByUserAddress } from "./Token.statics"

export enum TokenStatus {
    MINTED = "MINTED",
    BURNED = "BURNED"
}

type Transaction = {
    hash: string
    blockNumber: number
}

export type TokenData = {
    tokenId: string
    provider: OAuthProvider
    userAddress: string
    encryptedAttestation: string
    status?: TokenStatus
    transaction?: Transaction
}

export type TokenDocument = TokenData & Document

export type TokenModel = Model<TokenDocument> & {
    findByUserAddress: typeof findByUserAddress
}
