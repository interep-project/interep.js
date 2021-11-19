import checkParameter from "./checkParameter"
import { HashFunction, Proof } from "./types"

export default class MerkleTree {
    static readonly maxDepth = 32

    private _root: BigInt
    private readonly _nodes: BigInt[][]
    private readonly _zeroes: BigInt[]
    private readonly _hash: HashFunction
    private readonly _depth: number

    constructor(hash: HashFunction, depth: number, zeroValue: BigInt = BigInt(0)) {
        checkParameter(hash, "hash", "function")
        checkParameter(depth, "depth", "number")
        checkParameter(zeroValue, "zeroValue", "bigint")

        if (depth < 1 || depth > MerkleTree.maxDepth) {
            throw new Error("The tree depth must be between 1 and 32")
        }

        this._hash = hash
        this._depth = depth

        this._zeroes = []

        this._nodes = []

        for (let i = 0; i < depth; i += 1) {
            this._zeroes.push(zeroValue)
            this._nodes[i] = []

            zeroValue = hash([zeroValue, zeroValue])
        }

        this._root = zeroValue

        Object.freeze(this._zeroes)
        Object.freeze(this._nodes)
    }

    public get root(): BigInt {
        return this._root
    }

    public get depth(): number {
        return this._depth
    }

    public get leaves(): BigInt[] {
        return this._nodes[0].slice()
    }

    public get zeroes(): BigInt[] {
        return this._zeroes
    }

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

    public indexOf(leaf: BigInt): number {
        checkParameter(leaf, "leaf", "bigint")

        return this.leaves.indexOf(leaf)
    }
}
