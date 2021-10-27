import Token from "./Token.model"
import { TokenDocument } from "./Token.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByUserAddress(this: typeof Token, address: string): Promise<TokenDocument[] | null> {
    return this.find({ userAddress: address })
}
