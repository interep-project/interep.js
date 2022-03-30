import { OAuthProvider, ReputationLevel } from "@interep/reputation"
import { OffchainAPI } from "../src"
import request from "../src/request"

jest.mock("../src/request", () => ({
    __esModule: true,
    default: jest.fn()
}))

const requestMocked = request as jest.MockedFunction<typeof request>

describe("Interep offchain API", () => {
    let api: OffchainAPI

    describe("API class", () => {
        it("Should return an api object", () => {
            api = new OffchainAPI()
            const productionAPI = new OffchainAPI("production")
            const developmentAPI = new OffchainAPI("development")

            expect(api.url).toBe("https://kovan.interep.link/api/v1")
            expect(productionAPI.url).toBe("https://interep.link/api/v1")
            expect(developmentAPI.url).toBe("http://localhost:3000/api/v1")
        })

        it("Should throw an error if the environment is not a string", () => {
            const fun = () => new OffchainAPI(1 as any)

            expect(fun).toThrow("Parameter 'environment' is not a string")
        })

        it("Should throw an error if the environment is not supported", () => {
            const fun = () => new OffchainAPI("testing" as any)

            expect(fun).toThrow("Environment 'testing' is not supported")
        })
    })

    describe("# getProviders", () => {
        it("Should return all the supported providers", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve(["twitter", "github", "reddit", "telegram", "email"])
            )

            const expectedValue = await api.getProviders()

            expect(expectedValue).toBeDefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("twitter")
        })
    })

    describe("# getGroups", () => {
        it("Should return all the existing groups", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve([{ name: "gold", provider: "twitter", size: 1, numberOfLeaves: 1, root: "1" }])
            )

            const expectedValue = await api.getGroups()

            expect(expectedValue).toBeDefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({
                name: "gold",
                provider: "twitter",
                size: 1,
                numberOfLeaves: 1,
                root: "1"
            })
        })
    })

    describe("# getGroup", () => {
        it("Should return a specific group", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({ name: "gold", provider: "twitter", size: 1, numberOfLeaves: 1, root: "1" })
            )

            const expectedValue = await api.getGroup({ provider: OAuthProvider.TWITTER, name: "gold" })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toEqual({ name: "gold", provider: "twitter", size: 1, numberOfLeaves: 1, root: "1" })
        })
    })

    describe("# getGroupMembers", () => {
        it("Should return the group members", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(["1"]))

            const expectedValue = await api.getGroupMembers({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                limit: 1
            })

            expect(expectedValue).toBeDefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("1")
        })
    })

    describe("# hasMember", () => {
        it("Should throw an error if request parameters are not correct", async () => {
            const fun1 = () => api.hasMember(undefined as any)
            const fun2 = () => api.hasMember(12 as any)
            const fun3 = () => api.hasMember({ provider: undefined } as any)
            const fun4 = () => api.hasMember({ provider: 12 } as any)
            const fun5 = () => api.hasMember({ provider: "facebook", member: "1231" } as any)

            await expect(fun1).rejects.toThrow("Parameter 'request' is not defined")
            await expect(fun2).rejects.toThrow("Parameter 'request' is not an object")
            await expect(fun3).rejects.toThrow("Parameter 'provider' is not defined")
            await expect(fun4).rejects.toThrow("Parameter 'provider' is not a string")
            await expect(fun5).rejects.toThrow("Provider 'facebook' not supported")
        })

        it("Should return false if the member does not belong to any provider group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.hasMember({
                provider: OAuthProvider.TWITTER,
                member: "23131231231"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toBe(false)
        })

        it("Should return false if the member does not belong to a specific group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.hasMember({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                member: "23131231231"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toBe(false)
        })
    })

    describe("# addMember", () => {
        it("Should add a member for a OAuth group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.addMember({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                member: "23131231231",
                authenticationHeader: "token 3ao32423"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toBe(true)
        })

        it("Should add a member for a Web3 group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.addMember({
                provider: "poap",
                name: "devcon5",
                member: "23131231231",
                userAddress: "0xueaoueao",
                userSignature: "aueouaoe"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toBe(true)
        })
    })

    describe("# getMerkleTreeProof", () => {
        it("Should get a valid Merkle tree proof", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({ siblingNodes: ["0"], path: [0], root: "1123123" })
            )

            const expectedValue = await api.getMerkleTreeProof({
                provider: OAuthProvider.TWITTER,
                name: ReputationLevel.GOLD,
                member: "23131231231"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toHaveProperty("siblingNodes")
            expect(expectedValue).toHaveProperty("path")
            expect(expectedValue).toHaveProperty("root")
        })
    })

    describe("# getMerkleTreeLeaves", () => {
        it("Should get the leaves of a Merkle tree", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(["0", "1"]))

            const expectedValue = await api.getMerkleTreeLeaves({
                root: "1",
                limit: 1
            })

            expect(expectedValue).toBeDefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("1")
        })
    })

    describe("# hasMerkleTreeLeaf", () => {
        it("Should return true if a Merkle tree has a leaf", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.hasMerkleTreeLeaf({ root: "1", leaf: "1" })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toBe(true)
        })
    })

    describe("Get Merkle tree root batches", () => {
        it("Should get the root batches of a Merkle tree", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve([
                    {
                        group: { provider: "github", name: "gold" },
                        roots: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                        transaction: {
                            hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                            blockNumber: 10
                        }
                    }
                ])
            )

            const expectedValue = await api.getMerkleTreeRootBatches()

            expect(expectedValue).toBeDefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({
                group: { provider: "github", name: "gold" },
                roots: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                transaction: {
                    hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                    blockNumber: 10
                }
            })
        })
    })

    describe("Get Merkle tree root batch", () => {
        it("Should get a specific root batch of a Merkle tree", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({
                    group: { provider: "github", name: "gold" },
                    roots: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                    transaction: {
                        hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                        blockNumber: 10
                    }
                })
            )

            const expectedValue = await api.getMerkleTreeRootBatch({
                root: "1"
            })

            expect(expectedValue).toBeDefined()
            expect(expectedValue).toEqual({
                group: { provider: "github", name: "gold" },
                roots: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                transaction: {
                    hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                    blockNumber: 10
                }
            })
        })
    })
})
