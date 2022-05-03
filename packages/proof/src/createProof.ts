import { API, Network } from "@interep/api"
import type { ZkIdentity } from "@zk-kit/identity"
import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree"
import { Semaphore } from "@zk-kit/protocols"
import { poseidon } from "circomlibjs"
import checkParameter from "./checkParameter"
import createGroupId from "./createGroupId"
import { BigNumber, Group, InterepProof, ZKFiles } from "./types"

/**
 * Creates a Merkle proof using the Interep APIs and generates a Semaphore proof
 * to be used in the Interep contract.
 * @param identity The Semaphore identity.
 * @param group The group id parameters (id or provider/name).
 * @param externalNullifier The external nullifier.
 * @param signal The Semaphore signal.
 * @param zkFiles The zero-knowledge files (SnarkJS outputs).
 * @param network The Interep network.
 * @returns The Solidity parameters for the 'verifyProof' onchain function.
 */
export default async function createProof(
    identity: ZkIdentity,
    group: Group,
    externalNullifier: BigNumber,
    signal: string,
    zkFiles: ZKFiles,
    network?: Network
): Promise<InterepProof> {
    checkParameter(identity, "identity", "object")
    checkParameter(group, "group", "object")

    const identityCommitment = identity.genIdentityCommitment().toString()

    const { provider, name } = group as any

    checkParameter(name, "group.name", "string")
    checkParameter(provider, "group.provider", "string")

    const api = new API(network)
    const { depth, onchainRoot } = await api.getGroup({ provider, name })
    const members = await api.getGroupMembers({ provider, name })

    if (!onchainRoot) {
        throw new Error("Group has no Merkle tree root onchain")
    }

    const tree = new IncrementalMerkleTree(poseidon, depth, BigInt(0), 2)

    for (let i = 0; i < members.length && tree.root !== onchainRoot; i += 1) {
        tree.insert(BigInt(members[i]))
    }

    const leafIndex = tree.leaves.indexOf(BigInt(identityCommitment))

    if (leafIndex === -1) {
        throw new Error("Semaphore identity is not yet verifiable onchain")
    }

    const merkleProof = tree.createProof(leafIndex)

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

    const groupId = createGroupId(provider, name).toString()

    return { groupId, signal, publicSignals, proof, solidityProof }
}
