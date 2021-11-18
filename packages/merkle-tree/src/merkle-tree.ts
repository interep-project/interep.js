import { HashFunction, Proof } from "./types"

export default class MerkleTree {
    static readonly maxDepth = 32

    zeroes: BigInt[]
    nodes: BigInt[][]
    root: BigInt

    hash: HashFunction
    depth: number

    constructor(hash: HashFunction, depth: number, zero: BigInt = BigInt(0)) {
        if (depth < 1 || depth > MerkleTree.maxDepth) {
            throw new Error("The tree depth must be between 1 and 32")
        }

        this.hash = hash
        this.depth = depth

        this.zeroes = []
        this.nodes = []

        for (let i = 0; i < depth; i += 1) {
            this.zeroes.push(zero)
            this.nodes[i] = []

            zero = hash([zero, zero])
        }

        this.root = zero
    }

    insert(leaf: BigInt) {
        if (leaf === this.zeroes[0]) {
            throw new Error("The leaf cannot be a zero value")
        }

        if (this.nodes[0].length >= 2 ** this.depth) {
            throw new Error("The tree is full")
        }

        let index = this.nodes[0].length
        let node = leaf

        for (let i = 0; i < this.depth; i += 1) {
            this.nodes[i][index] = node

            if (index % 2 === 0) {
                node = this.hash([node, this.zeroes[i]])
            } else {
                node = this.hash([this.nodes[i][index - 1], node])
            }

            index = Math.floor(index / 2)
        }

        this.root = node
    }

    delete(index: number) {
        if (index < 0 || index >= this.nodes[0].length) {
            throw new Error("The leaf does not exist in this tree")
        }

        let node = this.zeroes[0]

        for (let i = 0; i < this.depth; i += 1) {
            this.nodes[i][index] = node

            if (index % 2 === 0) {
                node = this.hash([node, this.nodes[i][index + 1] || this.zeroes[i]])
            } else {
                node = this.hash([this.nodes[i][index - 1], node])
            }

            index = Math.floor(index / 2)
        }

        this.root = node
    }

    createProof(index: number): Proof {
        if (index < 0 || index >= this.nodes[0].length) {
            throw new Error("The leaf does not exist in this tree")
        }

        const leaf = this.nodes[0][index]
        const siblingNodes: BigInt[] = []
        const path: (0 | 1)[] = []

        for (let i = 0; i < this.depth; i += 1) {
            if (index % 2 === 0) {
                path.push(0)
                siblingNodes.push(this.nodes[i][index + 1] || this.zeroes[i])
            } else {
                path.push(1)
                siblingNodes.push(this.nodes[i][index - 1])
            }

            index = Math.floor(index / 2)
        }

        return { root: this.root, leaf, siblingNodes, path }
    }

    verifyProof(proof: Proof): boolean {
        let node = proof.leaf

        for (let i = 0; i < proof.siblingNodes.length; i += 1) {
            if (proof.path[i]) {
                node = this.hash([proof.siblingNodes[i], node])
            } else {
                node = this.hash([node, proof.siblingNodes[i]])
            }
        }

        return proof.root === node
    }

    indexOf(leaf: BigInt): number {
        return this.nodes[0].indexOf(leaf)
    }
}
