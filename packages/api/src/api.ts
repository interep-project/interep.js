// eslint-disable-next-line import/no-extraneous-dependencies
import { OAuthProvider } from "@interrep/reputation-criteria"
import { AxiosRequestConfig } from "axios"
import checkParameter from "./checkParameter"
import checkProvider from "./checkProvider"
import getURL from "./getURL"
import request from "./request"
import { Environment } from "./types/config"
import {
    AddIdentityCommitmentRequest,
    CheckIdentityCommitmentRequest,
    GetMerkleTreePathRequest
} from "./types/requestParameters"

export default class API {
    url: string

    constructor(environment: Environment = "staging") {
        this.url = getURL(environment)
    }

    async getGroups(): Promise<any[]> {
        return request(`${this.url}/groups`)
    }

    async getProviders(): Promise<string[]> {
        return request(`${this.url}/providers`)
    }

    async checkIdentityCommitment(parameters: CheckIdentityCommitmentRequest): Promise<boolean> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        if (name) {
            checkParameter(name, "name", "string")

            return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}/check`)
        }

        return request(`${this.url}/providers/${provider}/${identityCommitment}/check`)
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

    async getMerkleTreePath(parameters: GetMerkleTreePathRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { provider, name, identityCommitment } = parameters

        checkParameter(provider, "provider", "string")
        checkParameter(name, "name", "string")
        checkParameter(identityCommitment, "identity commitment", "string")
        checkProvider(provider)

        return request(`${this.url}/groups/${provider}/${name}/${identityCommitment}/path`)
    }
}
