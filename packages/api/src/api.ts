// eslint-disable-next-line import/no-extraneous-dependencies
import { OAuthProvider } from "@interep/reputation"
import { AxiosRequestConfig } from "axios"
import checkParameter from "./checkParameter"
import checkProvider from "./checkProvider"
import getURL from "./getURL"
import request from "./request"
import { Environment } from "./types/config"
import {
    AddIdentityCommitmentRequest,
    DeleteIdentityCommitmentRequest,
    GetGroupRequest,
    GetMerkleTreeLeavesRequest,
    GetMerkleTreeProofRequest,
    GetMerkleTreeRootBatchRequest,
    HasIdentityCommitmentRequest,
    HasMerkleTreeLeafRequest,
    RequestOptions
} from "./types/requestParameters"

export default class API {
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

    async getGroup(parameters: GetGroupRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")

        return request(`${this.url}/groups/${provider}/${name}`)
    }

    async hasIdentityCommitment(parameters: HasIdentityCommitmentRequest): Promise<boolean> {
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

    async addIdentityCommitment(parameters: AddIdentityCommitmentRequest): Promise<boolean> {
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

    async deleteIdentityCommitment(parameters: DeleteIdentityCommitmentRequest): Promise<boolean> {
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

    async getMerkleTreeProof(parameters: GetMerkleTreeProofRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}/proof`)
    }

    async getMerkleTreeLeaves(parameters: GetMerkleTreeLeavesRequest, options: RequestOptions): Promise<string[]> {
        checkParameter(parameters, "request", "object")
        checkParameter(options, "options", "object")

        const { rootHash } = parameters
        const { limit = 0 } = options

        checkParameter(rootHash, "root hash", "string")
        checkParameter(limit, "limit", "number")

        return request(`${this.url}/trees/${rootHash}?limit=${limit}`)
    }

    async hasMerkleTreeLeaf(parameters: HasMerkleTreeLeafRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { rootHash, leafHash } = parameters

        checkParameter(rootHash, "root hash", "string")
        checkParameter(leafHash, "leaf hash", "string")

        return request(`${this.url}/trees/${rootHash}/${leafHash}`)
    }

    async getMerkleTreeRootBatches(): Promise<any[]> {
        return request(`${this.url}/trees/batches`)
    }

    async getMerkleTreeRootBatch(parameters: GetMerkleTreeRootBatchRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { rootHash } = parameters

        checkParameter(rootHash, "root hash", "string")

        return request(`${this.url}/trees/batches/${rootHash}`)
    }
}
