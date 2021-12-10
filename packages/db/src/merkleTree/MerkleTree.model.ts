import { model, models } from "mongoose"
import { MerkleTreeNodeSchema, MerkleTreeRootsBatchSchema, MerkleTreeZeroSchema } from "./MerkleTree.schema"
import type {
    MerkleTreeNodeDocument,
    MerkleTreeNodeModel,
    MerkleTreeRootsBatchDocument,
    MerkleTreeRootsBatchModel,
    MerkleTreeZeroDocument,
    MerkleTreeZeroModel
} from "./MerkleTree.types"

const NODE_MODEL_NAME = "MerkleTreeNode"
const ZERO_MODEL_NAME = "MerkleTreeZero"
const ROOTS_BATCH_MODEL_NAME = "MerkleTreeRootsBatch"

// Because of Next.js HMR we need to get the model if it was already compiled
export const MerkleTreeNode: MerkleTreeNodeModel =
    (models[NODE_MODEL_NAME] as MerkleTreeNodeModel) ||
    model<MerkleTreeNodeDocument, MerkleTreeNodeModel>(NODE_MODEL_NAME, MerkleTreeNodeSchema, "treeNodes")

export const MerkleTreeZero: MerkleTreeZeroModel =
    (models[ZERO_MODEL_NAME] as MerkleTreeZeroModel) ||
    model<MerkleTreeZeroDocument, MerkleTreeZeroModel>(ZERO_MODEL_NAME, MerkleTreeZeroSchema, "treeZeroes")

export const MerkleTreeRootsBatch: MerkleTreeRootsBatchModel =
    (models[ROOTS_BATCH_MODEL_NAME] as MerkleTreeRootsBatchModel) ||
    model<MerkleTreeRootsBatchDocument, MerkleTreeRootsBatchModel>(
        ROOTS_BATCH_MODEL_NAME,
        MerkleTreeRootsBatchSchema,
        "treeRootsBatches"
    )
