import { model, models } from "mongoose"
import { MerkleTreeNodeSchema, MerkleTreeZeroSchema } from "./MerkleTree.schema"
import {
    MerkleTreeNodeDocument,
    MerkleTreeNodeModel,
    MerkleTreeZeroDocument,
    MerkleTreeZeroModel
} from "./MerkleTree.types"

const NODE_MODEL_NAME = "MerkleTreeNode"
const ZERO_MODEL_NAME = "MerkleTreeZero"

// Because of Next.js HMR we need to get the model if it was already compiled
export const MerkleTreeNode: MerkleTreeNodeModel =
    (models[NODE_MODEL_NAME] as MerkleTreeNodeModel) ||
    model<MerkleTreeNodeDocument, MerkleTreeNodeModel>(NODE_MODEL_NAME, MerkleTreeNodeSchema, "treeNodes")

export const MerkleTreeZero: MerkleTreeZeroModel =
    (models[ZERO_MODEL_NAME] as MerkleTreeZeroModel) ||
    model<MerkleTreeZeroDocument, MerkleTreeZeroModel>(ZERO_MODEL_NAME, MerkleTreeZeroSchema, "treeZeroes")
