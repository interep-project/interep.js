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

    async getGroupMembers(parameters: Offchain.GetGroupMembersRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name, limit = 0, offset = 0 } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(limit, "limit", "number")
        checkParameter(offset, "offset", "number")

        return request(`${this.url}/groups/${provider}/${name}/members?limit=${limit}&offset=${offset}`)
    }

    async hasMember(parameters: Offchain.HasMemberRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, member } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(member, "member", "string")
        checkProvider(provider)

        if (name) {
            checkParameter(name, "name", "string")

            return request(`${this.url}/groups/${provider}/${name}/${member}`)
        }

        return request(`${this.url}/providers/${provider}/${member}`)
    }

    async addMember(parameters: Offchain.AddMemberRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, member, authenticationHeader, userAddress, userSignature } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(member, "member", "string")
        checkProvider(provider)

        const config: AxiosRequestConfig = { method: "post" }

        if (Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
            checkParameter(authenticationHeader, "authentication header", "string")

            config.headers = { Authentication: authenticationHeader as string }

            return request(`${this.url}/groups/${provider}/${name}/${member}`, config)
        }

        checkParameter(userAddress, "user address", "string")
        checkParameter(userSignature, "user signature", "string")

        config.data = { userAddress, userSignature }

        return request(`${this.url}/groups/${provider}/${name}/${member}`, config)
    }

    async getMerkleTreeProof(parameters: Offchain.GetMerkleTreeProofRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name, member } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(member, "member", "string")
        checkProvider(provider)

        return request(`${this.url}/groups/${provider}/${name}/${member}/proof`)
    }

    async getMerkleTreeRootBatches(): Promise<any[]> {
        return request(`${this.url}/batches`)
    }

    async getMerkleTreeRootBatch(parameters: Offchain.GetMerkleTreeRootBatchRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { root } = parameters

        checkParameter(root, "root", "string")

        return request(`${this.url}/batches/${root}`)
    }
}
