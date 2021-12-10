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

export type Transaction = {
    hash: string
    blockNumber: number
    timestamp: number
}

export type MerkleTreeRootsBatchData = {
    group: Group
    hashes: string[]
    transaction?: Transaction
}

export type MerkleTreeRootsBatchDocument = MerkleTreeRootsBatchData & Document

export type MerkleTreeRootsBatchModel = Model<MerkleTreeRootsBatchDocument> & {}
