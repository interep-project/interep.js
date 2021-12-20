import type { MerkleTreeNode } from "./MerkleTree.model"
import type { Group, MerkleTreeNodeDocument } from "./MerkleTree.types"

export async function findByGroupAndLevelAndIndex(
    this: typeof MerkleTreeNode,
    group: Group,
    level: number,
    index: number
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": group.provider, "group.name": group.name, level, index })
        .populate("parent")
        .select({ __v: 0, _id: 0 })
}

export async function findByGroupAndHash(
    this: typeof MerkleTreeNode,
    group: Group,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": group.provider, "group.name": group.name, hash })
        .populate("parent")
        .select({ __v: 0, _id: 0 })
}

export async function findByGroupProviderAndHash(
    this: typeof MerkleTreeNode,
    groupProvider: string,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": groupProvider, hash }).populate("parent").select({ __v: 0, _id: 0 })
}

export async function getGroupNamesByProvider(this: typeof MerkleTreeNode, provider: string): Promise<string[]> {
    return this.distinct("group.name", { "group.provider": provider })
}

export async function getNumberOfActiveLeaves(this: typeof MerkleTreeNode, group: Group): Promise<number> {
    return this.countDocuments({
        "group.provider": group.provider,
        "group.name": group.name,
        level: 0,
        hash: { $ne: "0" }
    })
}

export async function getNumberOfNodes(this: typeof MerkleTreeNode, group: Group, level: number): Promise<number> {
    return this.countDocuments({ "group.provider": group.provider, "group.name": group.name, level })
}
