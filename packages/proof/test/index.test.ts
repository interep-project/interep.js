import { Identity } from "@semaphore-protocol/identity"
import createProof from "../src"

jest.mock("@interep/api", () => ({
    __esModule: true,
    API: jest.fn(() => ({
        getGroup: () => ({
            depth: 20,
            onchainRoot: 20
        }),
        getGroupMembers: () => ["19657177971873866758926013815619594809290030316713851870574761013161589495516"]
    }))
}))

jest.mock("@semaphore-protocol/proof", () => ({
    __esModule: true,
    generateProof: () => ({ publicSignals: { nullifierHash: 1 } }),
    packToSolidityProof: () => [1, 2, 3, 4, 5, 6, 7, 8]
}))

describe("Interep proof", () => {
    const identity = new Identity("test")
    const groupProvider = "github"
    const groupName = "unrated"
    const externalNullifier = 1
    const signal = "Hello World"

    const zkFiles = {
        wasmFilePath: "./packages/proof/snarkArtifacts/semaphore.wasm",
        zkeyFilePath: "./packages/proof/snarkArtifacts/semaphore.zkey"
    }

    describe("Create proof", () => {
        it("Should not create a Semaphore proof if the parameters do not have the right types", async () => {
            const fun1 = () => createProof(1 as any, groupProvider, groupName, externalNullifier, signal, zkFiles)
            const fun2 = () => createProof(identity, groupProvider, true as any, externalNullifier, signal, zkFiles)
            const fun3 = () => createProof(identity, 1 as any, groupName, externalNullifier, signal, zkFiles)
            const fun4 = () => createProof(identity, groupProvider, groupName, true as any, signal, zkFiles)
            const fun5 = () => createProof(identity, groupProvider, groupName, externalNullifier, 1 as any, zkFiles)
            const fun6 = () => createProof(identity, groupProvider, groupName, externalNullifier, signal, 1 as any)
            const fun7 = () =>
                createProof(identity, groupProvider, groupName, externalNullifier, signal, { wasmFilePath: 1 } as any)
            const fun8 = () =>
                createProof(identity, groupProvider, groupName, externalNullifier, signal, {
                    wasmFilePath: "",
                    zkeyFilePath: 1
                } as any)
            const fun9 = () =>
                createProof(identity, groupProvider, groupName, externalNullifier, signal, undefined as any)

            await expect(fun1).rejects.toThrow("Parameter 'identity' is not an object")
            await expect(fun2).rejects.toThrow("Parameter 'groupName' is not a string")
            await expect(fun3).rejects.toThrow("Parameter 'groupProvider' is not a string")
            await expect(fun4).rejects.toThrow(
                "Parameter 'externalNullifier' is none of the following types: number, bigint, string"
            )
            await expect(fun5).rejects.toThrow("Parameter 'signal' is not a string")
            await expect(fun6).rejects.toThrow("Parameter 'snarkArtifacts' is not an object")
            await expect(fun7).rejects.toThrow("Parameter 'snarkArtifacts.wasmFilePath' is not a string")
            await expect(fun8).rejects.toThrow("Parameter 'snarkArtifacts.zkeyFilePath' is not a string")
            await expect(fun9).rejects.toThrow("Parameter 'snarkArtifacts' is not defined")
        })

        it("Should create a Semaphore proof", async () => {
            const expectedValue = await createProof(
                identity,
                groupProvider,
                groupName,
                externalNullifier,
                signal,
                zkFiles
            )

            expect(typeof expectedValue).toBe("object")
            expect(Object.values(expectedValue)).toHaveLength(5)
        })
    })
})
