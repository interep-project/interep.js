import { Proof, SemaphorePublicSignals, SemaphoreSolidityProof } from "@zk-kit/protocols"

export type BigNumber = number | bigint | string

export type Group = {
    provider?: string
    name?: string
}

export type ZKFiles = {
    wasmFilePath: string
    zkeyFilePath: string
}

export type InterepProof = {
    groupId: string
    signal: string
    publicSignals: SemaphorePublicSignals
    proof: Proof
    solidityProof: SemaphoreSolidityProof
}
