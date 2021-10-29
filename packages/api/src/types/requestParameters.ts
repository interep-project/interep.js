import type { OAuthProvider } from "@interrep/reputation-criteria"

export enum Web3Provider {
    POAP = "poap"
}

export type Provider = OAuthProvider | Web3Provider | "telegram"

export type CheckIdentityCommitmentRequest = {
    provider: Provider
    name?: string
    identityCommitment: string
}

export type GetMerkleTreePathRequest = CheckIdentityCommitmentRequest & {
    name: string
}

export type AddIdentityCommitmentRequest = CheckIdentityCommitmentRequest & {
    name: string
    authenticationHeader?: string
    userAddress?: string
    userSignature?: string
}
