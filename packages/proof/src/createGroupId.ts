import { keccak256 } from "@ethersproject/solidity"
import { formatBytes32String } from "@ethersproject/strings"

const SNARK_SCALAR_FIELD = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")

export default function createGroupId(provider: string, name: string): bigint {
    return (
        BigInt(keccak256(["bytes32", "bytes32"], [formatBytes32String(provider), formatBytes32String(name)])) %
        SNARK_SCALAR_FIELD
    )
}
