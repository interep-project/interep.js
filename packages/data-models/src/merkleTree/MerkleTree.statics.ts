import { MerkleTreeNode, MerkleTreeZero } from "./MerkleTree.model"
import { Group, MerkleTreeNodeDocument, MerkleTreeZeroDocument } from "./MerkleTree.types"

export async function findByLevelAndIndex(
    this: typeof MerkleTreeNode,
    level: number,
    index: number
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ level, index }).populate("parent")
}

export async function findByGroupAndHash(
    this: typeof MerkleTreeNode,
    group: Omit<Group, "size">,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": group.provider, "group.name": group.name, hash }).populate("parent")
}

export async function findByGroupProviderAndHash(
    this: typeof MerkleTreeNode,
    groupProvider: string,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": groupProvider, hash }).populate("parent")
}

export async function getGroupNamesByProvider(this: typeof MerkleTreeNode, provider: string): Promise<string[]> {
    return this.distinct("group.name", { "group.provider": provider })
}

export async function getNumberOfNodes(
    this: typeof MerkleTreeNode,
    group: Omit<Group, "size">,
    level: number
): Promise<number> {
    return this.countDocuments({ "group.provider": group.provider, "group.name": group.name, level })
}

export async function findZeroes(this: typeof MerkleTreeZero): Promise<MerkleTreeZeroDocument[] | null> {
    return this.find()
}
