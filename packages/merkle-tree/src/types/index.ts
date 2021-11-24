export type Node = bigint | string | number

export type HashFunction = (values: Node[]) => Node

export type Proof = {
    root: Node
    leaf: Node
    siblingNodes: Node[]
    path: (0 | 1)[]
}
