import { Proof, PublicSignals, SolidityProof } from "@semaphore-protocol/proof"

export type BigNumber = number | bigint | string

export type SnarkArtifacts = {
    wasmFilePath: string
    zkeyFilePath: string
}

export type InterepProof = {
    groupId: string
    signal: string
    publicSignals: PublicSignals
    proof: Proof
    solidityProof: SolidityProof
}
