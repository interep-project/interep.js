import type { Model, Document } from "mongoose"
import type {
    findByGroupAndLevelAndIndex,
    findByGroupAndHash,
    getNumberOfActiveLeaves,
    getNumberOfNodes,
    findByGroupProviderAndHash,
    getGroupNamesByProvider
} from "./MerkleTree.statics"

export type Group = {
    provider: string
    name: string
}

export type MerkleTreeNodeData = {
    group: Group
    level: number
    index: number
    parent?: MerkleTreeNodeData // Root node has no parent.
    siblingHash?: string // Root has no sibling.
    hash: string
}

export type MerkleTreeNodeDocument = MerkleTreeNodeData & Document

export type MerkleTreeNodeModel = Model<MerkleTreeNodeDocument> & {
    findByGroupAndLevelAndIndex: typeof findByGroupAndLevelAndIndex
    findByGroupAndHash: typeof findByGroupAndHash
    findByGroupProviderAndHash: typeof findByGroupProviderAndHash
    getGroupNamesByProvider: typeof getGroupNamesByProvider
    getNumberOfActiveLeaves: typeof getNumberOfActiveLeaves
    getNumberOfNodes: typeof getNumberOfNodes
}

export type MerkleTreeZeroData = {
    level: number
    hash: string
}

export type MerkleTreeZeroDocument = MerkleTreeZeroData & Document

export type MerkleTreeZeroModel = Model<MerkleTreeZeroDocument> & {}

type Transaction = {
    hash: string
    blockNumber: number
}

export type MerkleTreeRootBatchData = {
    group: Group
    rootHashes: string[]
    transaction?: Transaction
}

export type MerkleTreeRootBatchDocument = MerkleTreeRootBatchData & Document

export type MerkleTreeRootBatchModel = Model<MerkleTreeRootBatchDocument> & {}
