import { keccak256 } from "@ethersproject/solidity"
import { OffchainAPI, OnchainAPI } from "@interep/api"
import type { ZkIdentity } from "@zk-kit/identity"
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols"
import checkParameter from "./checkParameter"
import { BigNumber, GroupId, ZKFiles } from "./types"

/**
 * Creates a Merkle proof using the Interep APIs and generates a Semaphore proof
 * to be used in the Interep contract.
 * @param identity The Semaphore identity.
 * @param groupId The group id parameters (id or provider/name).
 * @param externalNullifier The external nullifier.
 * @param signal The Semaphore signal.
 * @param zkFiles The zero-knowledge files (SnarkJS outputs).
 * @returns The Solidity parameters for the 'verifyProof' onchain function.
 */
export default async function createProof(
    identity: ZkIdentity,
    groupId: GroupId,
    externalNullifier: BigNumber,
    signal: string,
    zkFiles: ZKFiles
): Promise<any[]> {
    checkParameter(identity, "identity", "object")
    checkParameter(groupId, "groupId", ["number", "bigint", "string", "object"])

    const identityCommitment = identity.genIdentityCommitment().toString()

    let merkleProof: any

    if (typeof groupId === "object") {
        const { provider, name } = groupId as any

        checkParameter(name, "groupId.name", "string")
        checkParameter(provider, "groupId.provider", "string")

        const api = new OffchainAPI()

        merkleProof = await api.getMerkleTreeProof({ provider, name, identityCommitment })
        groupId = BigInt(keccak256(["string", "string"], [provider, name]))
    } else {
        groupId = groupId.toString()

        const api = new OnchainAPI()
        const { depth } = await api.getGroup({ id: groupId })
        const members = await api.getMembers({ groupId })
        const identityCommitments = members.map((member: any) => member.identityCommitment)

        merkleProof = generateMerkleProof(depth, BigInt(0), identityCommitments, identityCommitment)
    }

    checkParameter(externalNullifier, "externalNullifier", ["number", "bigint", "string"])
    checkParameter(signal, "signal", "string")
    checkParameter(zkFiles, "zkFiles", "object")
    checkParameter(zkFiles.wasmFilePath, "zkFiles.wasmFilePath", "string")
    checkParameter(zkFiles.zkeyFilePath, "zkFiles.zkeyFilePath", "string")

    const witness = Semaphore.genWitness(
        identity.getTrapdoor(),
        identity.getNullifier(),
        merkleProof,
        BigInt(externalNullifier),
        signal
    )

    const { publicSignals, proof } = await Semaphore.genProof(witness, zkFiles.wasmFilePath, zkFiles.zkeyFilePath)
    const solidityProof = Semaphore.packToSolidityProof(proof)

    return [groupId, signal, publicSignals.nullifierHash, publicSignals.externalNullifier, solidityProof]
}
