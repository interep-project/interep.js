import type { OAuthProvider } from "@interep/reputation"

export enum Web3Provider {
    POAP = "poap"
}

export type Provider = OAuthProvider | Web3Provider | "telegram" | "email"

export type RequestOptions = {
    limit: number
}

export type GetGroupRequest = {
    provider: Provider
    name: string
}

export type HasIdentityCommitmentRequest = {
    provider: Provider
    name?: string
    identityCommitment: string
}

export type GetMerkleTreeProofRequest = HasIdentityCommitmentRequest & {
    name: string
}

export type AddIdentityCommitmentRequest = HasIdentityCommitmentRequest & {
    authenticationHeader?: string
    userAddress?: string
    userSignature?: string
}

export type DeleteIdentityCommitmentRequest = AddIdentityCommitmentRequest

export type GetMerkleTreeLeavesRequest = {
    rootHash: string
}

export type HasMerkleTreeLeafRequest = GetMerkleTreeLeavesRequest & {
    leafHash: string
}

export type GetMerkleTreeRootBatchRequest = GetMerkleTreeLeavesRequest
