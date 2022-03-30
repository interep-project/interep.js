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
                        zeroValue
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
                        zeroValue
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

    async getGroupMembers(parameters: Onchain.GetGroupMembersRequest): Promise<any> {
        checkParameter(parameters, "request", "object")

        const { groupId } = parameters

        checkParameter(groupId, "groupId", "string")

        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    members(where: { group: "${groupId}" }) {
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
