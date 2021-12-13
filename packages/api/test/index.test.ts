import { OAuthProvider } from "@interrep/reputation"
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

    describe("Get groups", () => {
        it("Should return all the existing groups", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve([{ name: "GOLD", provider: "twitter", size: 1 }])
            )

            const expectedValue = await api.getGroups()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({ name: "GOLD", provider: "twitter", size: 1 })
        })
    })

    describe("Get providers", () => {
        it("Should return all the supported providers", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(["twitter", "github", "reddit"]))

            const expectedValue = await api.getProviders()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual("twitter")
        })
    })

    describe("Check identity commitment", () => {
        it("Should throw an error if request parameters are not correct", async () => {
            const fun1 = () => api.checkIdentityCommitment(undefined as any)
            const fun2 = () => api.checkIdentityCommitment(12 as any)
            const fun3 = () => api.checkIdentityCommitment({ provider: undefined } as any)
            const fun4 = () => api.checkIdentityCommitment({ provider: 12 } as any)
            const fun5 = () => api.checkIdentityCommitment({ provider: "facebook", identityCommitment: "1231" } as any)

            await expect(fun1).rejects.toThrow("Parameter 'request' is not defined")
            await expect(fun2).rejects.toThrow("Parameter 'request' is not an object")
            await expect(fun3).rejects.toThrow("Parameter 'provider' is not defined")
            await expect(fun4).rejects.toThrow("Parameter 'provider' is not a string")
            await expect(fun5).rejects.toThrow("Provider 'facebook' not supported")
        })

        it("Should return false if the identity commitment does not belong to any provider group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.checkIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                identityCommitment: "23131231231"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(false)
        })

        it("Should return false if the identity commitment does not belong to a specific group", async () => {
            requestMocked.mockImplementationOnce(() => Promise.resolve(false))

            const expectedValue = await api.checkIdentityCommitment({
                provider: OAuthProvider.TWITTER,
                name: "GOLD",
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
                name: "GOLD",
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
                name: "DEVCON_5",
                identityCommitment: "23131231231",
                userAddress: "0xueaoueao",
                userSignature: "aueouaoe"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual(true)
        })
    })

    describe("Get Merkle tree path", () => {
        it("Should get a valid Merkle tree path", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({ pathElements: ["0"], indices: [0], root: "1123123" })
            )

            const expectedValue = await api.getMerkleTreePath({
                provider: OAuthProvider.TWITTER,
                name: "GOLD",
                identityCommitment: "23131231231"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toHaveProperty("pathElements")
            expect(expectedValue).toHaveProperty("indices")
            expect(expectedValue).toHaveProperty("root")
        })
    })
})
