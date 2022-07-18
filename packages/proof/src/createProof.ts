import { API, Network, Provider } from "@interep/api"
import { Group } from "@semaphore-protocol/group"
import type { Identity } from "@semaphore-protocol/identity"
import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof"
import checkParameter from "./checkParameter"
import createGroupId from "./createGroupId"
import { BigNumber, InterepProof, SnarkArtifacts } from "./types"

/**
 * Creates a Merkle proof using the Interep APIs and generates a Semaphore proof
 * to be used in the Interep contract.
 * @param identity The Semaphore identity.
 * @param groupProvider The group provider.
 * @param groupName The group name.
 * @param externalNullifier The external nullifier.
 * @param signal The Semaphore signal.
 * @param snarkArtifacts The Snark artifacts.
 * @param network The Interep network.
 * @returns The Solidity parameters for the 'verifyProof' onchain function.
 */
export default async function createProof(
    identity: Identity,
    groupProvider: string,
    groupName: string,
    externalNullifier: BigNumber,
    signal: string,
    snarkArtifacts: SnarkArtifacts,
    network?: Network
): Promise<InterepProof> {
    checkParameter(identity, "identity", "object")
    checkParameter(groupProvider, "groupProvider", "string")
    checkParameter(groupName, "groupName", "string")

    const identityCommitment = identity.generateCommitment()

    const api = new API(network)
    const { depth, onchainRoot } = await api.getGroup({ provider: groupProvider as Provider, name: groupName })
    const members = await api.getGroupMembers({ provider: groupProvider as Provider, name: groupName })

    if (!onchainRoot) {
        throw new Error("The group has no Merkle tree root onchain")
    }

    const group = new Group(depth)

    group.addMembers(members)

    const memberIndex = group.indexOf(identityCommitment)

    if (memberIndex === -1) {
        throw new Error("The semaphore identity is not yet verifiable onchain")
    }

    const merkleProof = group.generateProofOfMembership(memberIndex)

    checkParameter(externalNullifier, "externalNullifier", ["number", "bigint", "string"])
    checkParameter(signal, "signal", "string")
    checkParameter(snarkArtifacts, "snarkArtifacts", "object")
    checkParameter(snarkArtifacts.wasmFilePath, "snarkArtifacts.wasmFilePath", "string")
    checkParameter(snarkArtifacts.zkeyFilePath, "snarkArtifacts.zkeyFilePath", "string")

    const { publicSignals, proof } = await generateProof(
        identity,
        merkleProof,
        BigInt(externalNullifier),
        signal,
        snarkArtifacts
    )
    const solidityProof = packToSolidityProof(proof)

    const groupId = createGroupId(groupProvider, groupName).toString()

    return { groupId, signal, publicSignals, proof, solidityProof }
}
