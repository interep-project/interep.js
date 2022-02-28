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

        const { id } = parameters

        checkParameter(id, "id", "string")

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
                    }
                }`
            })
        }

        const { onchainGroups } = await request(this.url, config)

        return onchainGroups[0]
    }

    async getMembers(parameters: Onchain.GetMembersRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { id } = parameters

        checkParameter(id, "id", "string")

        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    members(where: { group: "${id}" }, orderBy: index) {
                        id
                        identityCommitment
                        index
                    }
                }`
            })
        }

        const { members } = await request(this.url, config)

        return members
    }
}
