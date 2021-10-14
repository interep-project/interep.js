export enum Web2Provider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}

export enum Web3Provider {
    POAP = "poap"
}

export type Provider = Web2Provider | Web3Provider

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
