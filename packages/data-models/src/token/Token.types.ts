import type { Provider } from "@interrep/reputation-criteria"
import { Model, Document } from "mongoose"
import { Transaction } from "../transaction/Transaction.types"
import { findByUserAddress } from "./Token.statics"

export enum TokenStatus {
    NOT_MINTED = "NOT_MINTED",
    MINT_PENDING = "MINT_PENDING",
    MINTED = "MINTED",
    BURN_PENDING = "BURN_PENDING",
    BURNED = "BURNED",
    REVOKED = "REVOKED"
}

export type TokenData = {
    chainId: number
    contractAddress: string
    userAddress: string
    encryptedAttestation: string
    issuanceTimestamp: number
    decimalId: string
    status: TokenStatus
    mintTransactions?: Transaction[]
    provider: Provider
}

export type TokenDocument = TokenData & Document

export type TokenModel = Model<TokenDocument> & {
    findByUserAddress: typeof findByUserAddress
}