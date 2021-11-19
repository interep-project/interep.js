import checkParameter from "./checkParameter"
import { HashFunction, Proof } from "./types"

/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The MerkleTree class is a TypeScript implementation of Merkle tree and it provides all the functions to create
 * efficient trees and to generate and verify proofs of membership.
 */
export default class MerkleTree {
    static readonly maxDepth = 32 // 2**32 = 4294967296 possible leaves.

    private _root: BigInt
    private readonly _nodes: BigInt[][]
    private readonly _zeroes: BigInt[]
    private readonly _hash: HashFunction
    private readonly _depth: number

    /**
     * Initializes the Merkle tree with the hash function, the depth and the zero value to use for zeroes.
     * @param hash Hash function.
     * @param depth Tree depth.
     * @param zeroValue Zero values for zeroes.
     */
    constructor(hash: HashFunction, depth: number, zeroValue: BigInt = BigInt(0)) {
        checkParameter(hash, "hash", "function")
        checkParameter(depth, "depth", "number")
        checkParameter(zeroValue, "zeroValue", "bigint")

        if (depth < 1 || depth > MerkleTree.maxDepth) {
            throw new Error("The tree depth must be between 1 and 32")
        }

        // Initialize the attributes.
        this._hash = hash
        this._depth = depth
        this._zeroes = []
        this._nodes = []

        for (let i = 0; i < depth; i += 1) {
            this._zeroes.push(zeroValue)
            this._nodes[i] = []
            // There must be a zero value for each tree level (except the root).
            zeroValue = hash([zeroValue, zeroValue])
        }

        // The default root is the last zero value.
        this._root = zeroValue

        // Freeze the array objects. It prevents unintentional changes.
        Object.freeze(this._zeroes)
        Object.freeze(this._nodes)
    }

    /**
     * Returns the root hash of the tree.
     * @returns Root hash.
     */
    public get root(): BigInt {
        return this._root
    }

    /**
     * Returns the depth of the tree.
     * @returns Tree depth.
     */
    public get depth(): number {
        return this._depth
    }

    /**
     * Returns the leaves of the tree.
     * @returns List of leaves.
     */
    public get leaves(): BigInt[] {
        return this._nodes[0].slice()
    }

    /**
     * Returns the zeroes nodes of the tree.
     * @returns List of zeroes.
     */
    public get zeroes(): BigInt[] {
        return this._zeroes
    }

    /**
     * Inserts a new leaf in the tree.
     * @param leaf New leaf.
     */
    public insert(leaf: BigInt) {
        checkParameter(leaf, "leaf", "bigint")

        if (leaf === this._zeroes[0]) {
            throw new Error("The leaf cannot be a zero value")
        }

        if (this.leaves.length >= 2 ** this._depth) {
            throw new Error("The tree is full")
        }

        let index = this.leaves.length
        let node = leaf

        for (let i = 0; i < this._depth; i += 1) {
            this._nodes[i][index] = node

            if (index % 2 === 0) {
                node = this._hash([node, this._zeroes[i]])
            } else {
                node = this._hash([this._nodes[i][index - 1], node])
            }

            index = Math.floor(index / 2)
        }

        this._root = node
    }

    /**
     * Deletes a leaf from the tree. It does not remove the leaf from
     * the data structure. It set the leaf to be deleted to a zero value.
     * @param index Index of the leaf to be deleted.
     */
    public delete(index: number) {
        checkParameter(index, "index", "number")

        if (index < 0 || index >= this.leaves.length) {
            throw new Error("The leaf does not exist in this tree")
        }

        let node = this._zeroes[0]

        for (let i = 0; i < this._depth; i += 1) {
            this._nodes[i][index] = node

            if (index % 2 === 0) {
                node = this._hash([node, this._nodes[i][index + 1] || this._zeroes[i]])
            } else {
                node = this._hash([this._nodes[i][index - 1], node])
            }

            index = Math.floor(index / 2)
        }

        this._root = node
    }

    /**
     * Creates a proof of membership.
     * @param index Index of the proof's leaf.
     * @returns Proof object.
     */
    public createProof(index: number): Proof {
        checkParameter(index, "index", "number")

        if (index < 0 || index >= this.leaves.length) {
            throw new Error("The leaf does not exist in this tree")
        }

        const leaf = this.leaves[index]
        const siblingNodes: BigInt[] = []
        const path: (0 | 1)[] = []

        for (let i = 0; i < this._depth; i += 1) {
            if (index % 2 === 0) {
                path.push(0)
                siblingNodes.push(this._nodes[i][index + 1] || this._zeroes[i])
            } else {
                path.push(1)
                siblingNodes.push(this._nodes[i][index - 1])
            }

            index = Math.floor(index / 2)
        }

        return { root: this._root, leaf, siblingNodes, path }
    }

    /**
     * Verifies a proof and return true or false.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    public verifyProof(proof: Proof): boolean {
        checkParameter(proof, "proof", "object")
        checkParameter(proof.root, "proof.root", "bigint")
        checkParameter(proof.leaf, "proof.leaf", "bigint")
        checkParameter(proof.siblingNodes, "proof.siblingNodes", "object")
        checkParameter(proof.path, "proof.path", "object")

        let node = proof.leaf

        for (let i = 0; i < proof.siblingNodes.length; i += 1) {
            if (proof.path[i]) {
                node = this._hash([proof.siblingNodes[i], node])
            } else {
                node = this._hash([node, proof.siblingNodes[i]])
            }
        }

        return proof.root === node
    }

    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param leaf Tree leaf.
     * @returns Index of the leaf.
     */
    public indexOf(leaf: BigInt): number {
        checkParameter(leaf, "leaf", "bigint")

        return this.leaves.indexOf(leaf)
    }
}
