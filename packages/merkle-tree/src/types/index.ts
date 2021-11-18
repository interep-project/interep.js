export type HashFunction = (values: BigInt[]) => BigInt

export type Proof = {
    root: BigInt
    leaf: BigInt
    siblingNodes: BigInt[]
    path: (0 | 1)[]
}
