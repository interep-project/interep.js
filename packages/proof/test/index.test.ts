import { formatBytes32String } from "@ethersproject/strings"
import { Strategy, ZkIdentity } from "@zk-kit/identity"
import createProof from "../src"

jest.mock("@interep/api", () => ({
    __esModule: true,
    OffchainAPI: jest.fn(() => ({
        getMerkleTreeProof: () => ({})
    })),
    OnchainAPI: jest.fn(() => ({
        getGroup: () => ({}),
        getMembers: () => []
    }))
}))

jest.mock("@zk-kit/protocols", () => ({
    __esModule: true,
    Semaphore: {
        genWitness: () => ({}),
        genProof: () => ({ publicSignals: { nullifierHash: 1 } }),
        packToSolidityProof: () => [1, 2, 3, 4, 5, 6, 7, 8]
    },
    generateMerkleProof: () => ({})
}))

describe("Interep proof", () => {
    const identity = new ZkIdentity(Strategy.MESSAGE, "test")
    const groupId = BigInt(formatBytes32String("test"))
    const groupProvider = "github"
    const groupName = "gold"
    const externalNullifier = 1
    const signal = "Hello World"

    const zkFiles = {
        wasmFilePath: "./packages/proof/zkFiles/semaphore.wasm",
        zkeyFilePath: "./packages/proof/zkFiles/semaphore_final.zkey"
    }

    describe("Create proof", () => {
        it("Should not create a Semaphore proof if the parameters do not have the right types", async () => {
            const fun1 = () => createProof(1 as any, groupId, externalNullifier, signal, zkFiles)
            const fun2 = () => createProof(identity, true as any, externalNullifier, signal, zkFiles)
            const fun3 = () => createProof(identity, { name: 1 } as any, externalNullifier, signal, zkFiles)
            const fun4 = () =>
                createProof(identity, { name: "1", provider: 1 } as any, externalNullifier, signal, zkFiles)
            const fun5 = () => createProof(identity, groupId, true as any, signal, zkFiles)
            const fun6 = () => createProof(identity, groupId, externalNullifier, 1 as any, zkFiles)
            const fun7 = () => createProof(identity, groupId, externalNullifier, signal, 1 as any)
            const fun8 = () => createProof(identity, groupId, externalNullifier, signal, { wasmFilePath: 1 } as any)
            const fun9 = () =>
                createProof(identity, groupId, externalNullifier, signal, {
                    wasmFilePath: "",
                    zkeyFilePath: 1
                } as any)
            const fun10 = () => createProof(identity, groupId, externalNullifier, signal, undefined as any)

            await expect(fun1).rejects.toThrow("Parameter 'identity' is not an object")
            await expect(fun2).rejects.toThrow(
                "Parameter 'groupId' is none of the following types: number, bigint, string, object"
            )
            await expect(fun3).rejects.toThrow("Parameter 'groupId.name' is not a string")
            await expect(fun4).rejects.toThrow("Parameter 'groupId.provider' is not a string")
            await expect(fun5).rejects.toThrow(
                "Parameter 'externalNullifier' is none of the following types: number, bigint, string"
            )
            await expect(fun6).rejects.toThrow("Parameter 'signal' is not a string")
            await expect(fun7).rejects.toThrow("Parameter 'zkFiles' is not an object")
            await expect(fun8).rejects.toThrow("Parameter 'zkFiles.wasmFilePath' is not a string")
            await expect(fun9).rejects.toThrow("Parameter 'zkFiles.zkeyFilePath' is not a string")
            await expect(fun10).rejects.toThrow("Parameter 'zkFiles' is not defined")
        })

        it("Should create a Semaphore proof of an onchain group", async () => {
            const expectedValue = await createProof(identity, groupId, externalNullifier, signal, zkFiles)

            expect(expectedValue).toHaveLength(5)
            expect(expectedValue[4]).toHaveLength(8)
        })

        it("Should create a Semaphore proof", async () => {
            const expectedValue = await createProof(
                identity,
                { name: groupName, provider: groupProvider },
                externalNullifier,
                signal,
                zkFiles
            )

            expect(expectedValue).toHaveLength(5)
            expect(expectedValue[4]).toHaveLength(8)
        })
    })
})
