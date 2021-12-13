import type { OAuthProvider } from "@interrep/reputation"

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

export type GetMerkleTreeProofRequest = HasMerkleTreeLeafRequest

export type GetMerkleTreeRootBatchRequest = GetMerkleTreeLeavesRequest
