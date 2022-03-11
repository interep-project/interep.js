import { keccak256 } from "@ethersproject/solidity"
import { formatBytes32String } from "@ethersproject/strings"

export default function createOffchainGroupId(provider: string, name: string): bigint {
    return BigInt(keccak256(["bytes32", "bytes32"], [formatBytes32String(provider), formatBytes32String(name)]))
}
