import type Token from "./Token.model"
import type { TokenDocument } from "./Token.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByUserAddress(this: typeof Token, userAddress: string): Promise<TokenDocument[]> {
    return this.find({ userAddress })
}
