import { OnchainAPI } from "@interep/api"
import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree"
import { poseidon } from "circomlibjs"

export default async function createOffchainMerkleTree(
    groupId: string,
    depth: number,
    leaves: string[]
): Promise<IncrementalMerkleTree> {
    const onchainAPI = new OnchainAPI()

    const { root } = await onchainAPI.getOffchainGroup({ id: groupId })
    const tree = new IncrementalMerkleTree(poseidon, depth, BigInt(0), 2)

    for (let i = 0; i < leaves.length && tree.root !== root; i += 1) {
        tree.insert(BigInt(leaves[i]))
    }

    return tree
}
