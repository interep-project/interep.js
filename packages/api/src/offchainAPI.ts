// eslint-disable-next-line import/no-extraneous-dependencies
import { OAuthProvider } from "@interep/reputation"
import { AxiosRequestConfig } from "axios"
import checkParameter from "./checkParameter"
import checkProvider from "./checkProvider"
import getURL from "./getURL"
import request from "./request"
import { Environment } from "./types/config"
import { Offchain } from "./types/requestParameters"

export default class offchainAPI {
    url: string

    constructor(environment: Environment = "staging") {
        this.url = getURL(environment)
    }

    async getProviders(): Promise<string[]> {
        return request(`${this.url}/providers`)
    }

    async getGroups(): Promise<any[]> {
        return request(`${this.url}/groups`)
    }

    async getGroup(parameters: Offchain.GetGroupRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")

        return request(`${this.url}/groups/${provider}/${name}`)
    }

    async hasMember(parameters: Offchain.HasMemberRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        if (name) {
            checkParameter(name, "name", "string")

            return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}`)
        }

        return request(`${this.url}/providers/${provider}/${identityCommitment}`)
    }

    async addMember(parameters: Offchain.AddMemberRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment, authenticationHeader, userAddress, userSignature } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        const config: AxiosRequestConfig = { method: "post" }

        if (Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
            checkParameter(authenticationHeader, "authentication header", "string")

            config.headers = { Authentication: authenticationHeader as string }

            return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}`, config)
        }

        checkParameter(userAddress, "user address", "string")
        checkParameter(userSignature, "user signature", "string")

        config.data = { userAddress, userSignature }

        return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}`, config)
    }

    async removeMember(parameters: Offchain.RemoveMemberRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment, authenticationHeader, userAddress, userSignature } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        const config: AxiosRequestConfig = { method: "delete" }

        if (Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
            checkParameter(authenticationHeader, "authentication header", "string")

            config.headers = { Authentication: authenticationHeader as string }

            return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}`, config)
        }

        checkParameter(userAddress, "user address", "string")
        checkParameter(userSignature, "user signature", "string")

        config.data = { userAddress, userSignature }

        return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}`, config)
    }

    async getMerkleTreeProof(parameters: Offchain.GetMerkleTreeProofRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}/proof`)
    }

    async getMerkleTreeLeaves(
        parameters: Offchain.GetMerkleTreeLeavesRequest,
        options: Offchain.RequestOptions
    ): Promise<string[]> {
        checkParameter(parameters, "request", "object")
        checkParameter(options, "options", "object")

        const { root: rootHash } = parameters
        const { limit = 0, offset = 0 } = options

        checkParameter(rootHash, "root hash", "string")
        checkParameter(limit, "limit", "number")
        checkParameter(offset, "offset", "number")

        return request(`${this.url}/trees/${rootHash}?limit=${limit}&offset=${offset}`)
    }

    async hasMerkleTreeLeaf(parameters: Offchain.HasMerkleTreeLeafRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { root: rootHash, leaf: leafHash } = parameters

        checkParameter(rootHash, "root hash", "string")
        checkParameter(leafHash, "leaf hash", "string")

        return request(`${this.url}/trees/${rootHash}/${leafHash}`)
    }

    async getMerkleTreeRootBatches(): Promise<any[]> {
        return request(`${this.url}/trees/batches`)
    }

    async getMerkleTreeRootBatch(parameters: Offchain.GetMerkleTreeRootBatchRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { root: rootHash } = parameters

        checkParameter(rootHash, "root hash", "string")

        return request(`${this.url}/trees/batches/${rootHash}`)
    }
}
