import { keccak256 } from "@ethersproject/solidity"
import { OffchainAPI, OnchainAPI } from "@interep/api"
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols"
import checkParameter from "./checkParameter"

/**
 * Create a Semaphore proof.
 * @param identity The Semaphore identity.
 * @param group The group id parameters (id or provider/name).
 * @param externalNullifier The external nullifier.
 * @param signal .
 * @param zkProofFiles .
 * @returns The Solidity parameters for the 'verifyProof' onchain function.
 */
export default async function createProof(
    identity: any,
    group: {
        provider?: string
        name?: string
        id?: number | bigint | string
    },
    externalNullifier: number | bigint | string,
    signal: string,
    zkProofFiles: {
        wasm: string
        zkey: string
    }
): Promise<any> {
    checkParameter(identity, "identity", "object")
    checkParameter(group, "group", "object")

    const identityCommitment = identity.genIdentityCommitment()

    let groupId = group.id as string
    let merkleProof: any

    if (!groupId) {
        const { provider, name } = group as any

        checkParameter(name, "group.name", "string")
        checkParameter(provider, "group.provider", "string")

        const api = new OffchainAPI()

        merkleProof = await api.getMerkleTreeProof({ provider, name, identityCommitment })
        groupId = keccak256(["string", "string"], [provider, name])
    } else {
        checkParameter(groupId, "group.id", ["number", "bigint", "string"])

        const api = new OnchainAPI()
        const { depth } = await api.getGroup({ id: groupId })
        const members = await api.getMembers({ groupId })
        const identityCommitments = members.map((member: any) => member.identityCommitment)

        merkleProof = generateMerkleProof(depth, BigInt(0), identityCommitments, identityCommitment)
    }

    checkParameter(externalNullifier, "externalNullifier", ["number", "bigint", "string"])
    checkParameter(signal, "signal", "string")

    const witness = Semaphore.genWitness(
        identity.getTrapdoor(),
        identity.getNullifier(),
        merkleProof,
        BigInt(externalNullifier),
        signal
    )

    const { publicSignals, proof } = await Semaphore.genProof(witness, zkProofFiles.wasm, zkProofFiles.zkey)
    const solidityProof = Semaphore.packToSolidityProof(proof)

    return [groupId, signal, publicSignals.nullifierHash, externalNullifier, solidityProof]
}
