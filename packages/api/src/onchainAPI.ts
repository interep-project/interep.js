import { AxiosRequestConfig } from "axios"
import checkParameter from "./checkParameter"
import getURL from "./getURL"
import request from "./request"
import { Onchain } from "./types/requestParameters"

export default class onchainAPI {
    url: string

    constructor() {
        this.url = getURL("staging", true)
    }

    async getGroups(): Promise<any[]> {
        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    onchainGroups {
                        id
                        depth
                        size
                        numberOfLeaves
                        root
                        admin
                    }
                }`
            })
        }

        const { onchainGroups } = await request(this.url, config)

        return onchainGroups
    }

    async getGroup(parameters: Onchain.GetGroupRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { id, members = false } = parameters

        checkParameter(id, "id", "string")
        checkParameter(members, "members", "boolean")

        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    onchainGroups(where: { id: "${id}" }) {
                        id
                        depth
                        size
                        numberOfLeaves
                        root
                        admin
                        ${
                            members === true
                                ? `members(orderBy: index) {
                            id
                            identityCommitment
                            index
                        }`
                                : ""
                        }
                    }
                }`
            })
        }

        const { onchainGroups } = await request(this.url, config)

        return onchainGroups[0]
    }

    async getOffchainGroups(): Promise<any[]> {
        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    offchainGroups {
                        id
                        depth
                        root
                    }
                }`
            })
        }

        const { offchainGroups } = await request(this.url, config)

        return offchainGroups
    }

    async getOffchainGroup(parameters: Onchain.GetOffchainGroupRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { id } = parameters

        checkParameter(id, "id", "string")

        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    offchainGroups(where: { id: "${id}" }) {
                        id
                        depth
                        root
                    }
                }`
            })
        }

        const { offchainGroups } = await request(this.url, config)

        return offchainGroups[0]
    }
}
