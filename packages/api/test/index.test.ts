import { OAuthProvider, ReputationLevel } from "@interrep/reputation"
import { API, Web3Provider } from "../src"
import request from "../src/request"

jest.mock("../src/request", () => ({
    __esModule: true,
    default: jest.fn()
}))

const requestMocked = request as jest.MockedFunction<typeof request>

describe("InterRep API", () => {
    let api: API

    describe("API class", () => {
        it("Should return an api object", () => {
            api = new API()
            const productionAPI = new API("production")
            const developmentAPI = new API("development")

            expect(api.url).toEqual("https://kovan.interrep.link/api")
            expect(productionAPI.url).toEqual("https://interrep.link/api")
            expect(developmentAPI.url).toEqual("http://localhost:3000/api")
        })

        it("Should throw an error if the environment is not a string", () => {
            const fun = () => new API(1 as any)

            expect(fun).toThrow("Parameter 'environment' is not a string")
        })

        it("Should throw an error if the environment is not supported", () => {
            const fun = () => new API("testing" as any)

            expect(fun).toThrow("Environment 'testing' is not supported")
        })
    })

    describe("Get providers", () => {
        it("Should return all the supported providers", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve(["twitter", "github", "reddit", "telegram", "email"])
            )

            const expectedValue = await api.getProviders()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("twitter")
        })
    })

    describe("Get groups", () => {
        it("Should return all the existing groups", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve([{ name: "gold", provider: "twitter", size: 1, rootHash: "1" }])
            )

            const expectedValue = await api.getGroups()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({ name: "gold", provider: "twitter", size: 1, rootHash: "1" })
        })
    })

    describe("Get group", () => {
        it("Should return a specific group", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({ name: "gold", provider: "twitter", size: 1, rootHash: "1" })
            )

            const expectedValue = await api.getGroup({ provider: OAuthProvider.TWITTER, name: "gold" })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual({ name: "gold", provider: "twitter", size: 1, rootHash: "1" })
        })
    })

    describe("Check identity commitment", () => {
        it("Should throw an error if request parameters are not correct", async () => {
            const fun1 = () => api.hasIdentityCommitment(undefined as any)
            const fun2 = () => api.hasIdentityCommitment(12 as any)
            const fun3 = () => api.hasIdentityCommitment({ provider: undefined } as any)
            const fun4 = () => api.hasIdentityCommitment({ provider: 12 } as any)
            const fun5 = () => api.hasIdentityCommitment({ provider: "facebook", identityCommitment: "1231" } as any)

            await expect(fun1).rejects.toThrow("Parameter 'request' is not defined")
            await expect(fun2).rejects.toThrow("Parameter 'request' is not an object")
            await expect(fun3).rejects.toThrow("Parameter 'provider' is not defined")
            await expect(fun4).rejects.toThrow("Parameter 'provider' is not a string")
            await expect(fun5).rejects.toThrow("Provider 'facebook' not supported")
        })

        it("Should return false if the identity commitment does not belong to any provider group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.hasIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                identityCommitment: "23131231231"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(false)
        })

        it("Should return false if the identity commitment does not belong to a specific group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.hasIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                identityCommitment: "23131231231"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(false)
        })
    })

    describe("Add identity commitment", () => {
        it("Should add an identity commitment for a OAuth group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.addIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                identityCommitment: "23131231231",
                authenticationHeader: "token 3ao32423"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })

        it("Should add an identity commitment for a Web3 group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.addIdentityCommitment({
                provider: Web3Provider.POAP,
                name: "devcon5",
                identityCommitment: "23131231231",
                userAddress: "0xueaoueao",
                userSignature: "aueouaoe"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })
    })

    describe("Delete identity commitment", () => {
        it("Should delete an identity commitment for a OAuth group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.deleteIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                name: "gold",
                identityCommitment: "23131231231",
                authenticationHeader: "token 3ao32423"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })

        it("Should delete an identity commitment for a Web3 group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.deleteIdentityCommitment({
                provider: Web3Provider.POAP,
                name: "devcon5",
                identityCommitment: "23131231231",
                userAddress: "0xueaoueao",
                userSignature: "aueouaoe"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })
    })

    describe("Get Merkle tree proof", () => {
        it("Should get a valid Merkle tree proof", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({ siblingNodes: ["0"], path: [0], root: "1123123" })
            )

            const expectedValue = await api.getMerkleTreeProof({
                provider: OAuthProvider.TWITTER,
                name: ReputationLevel.GOLD,
                identityCommitment: "23131231231"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toHaveProperty("siblingNodes")
            expect(expectedValue).toHaveProperty("path")
            expect(expectedValue).toHaveProperty("root")
        })
    })

    describe("Get Merkle tree leaves", () => {
        it("Should get the leaves of a Merkle tree", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(["0", "1"]))

            const expectedValue = await api.getMerkleTreeLeaves(
                {
                    rootHash: "1"
                },
                { limit: 1 }
            )

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("1")
        })
    })

    describe("Has Merkle tree leaf", () => {
        it("Should return true if a Merkle tree has a leaf", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(true))

            const expectedValue = await api.hasMerkleTreeLeaf({ rootHash: "1", leafHash: "1" })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })
    })

    describe("Get Merkle tree root batches", () => {
        it("Should get the root batches of a Merkle tree", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve([
                    {
                        group: { provider: "github", name: "gold" },
                        rootHashes: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                        transaction: {
                            hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                            blockNumber: 10
                        }
                    }
                ])
            )

            const expectedValue = await api.getMerkleTreeRootBatches()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({
                group: { provider: "github", name: "gold" },
                rootHashes: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
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
                    rootHashes: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                    transaction: {
                        hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                        blockNumber: 10
                    }
                })
            )

            const expectedValue = await api.getMerkleTreeRootBatch({
                rootHash: "1"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual({
                group: { provider: "github", name: "gold" },
                rootHashes: ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
                transaction: {
                    hash: "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                    blockNumber: 10
                }
            })
        })
    })
})
