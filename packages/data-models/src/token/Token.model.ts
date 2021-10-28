import { model, models } from "mongoose"
import TokenSchema from "./Token.schema"
import type { TokenDocument, TokenModel } from "./Token.types"

const MODEL_NAME = "Token"

// Because of Next.js HMR we need to get the model if it was already compiled
const Token: TokenModel =
    (models[MODEL_NAME] as TokenModel) || model<TokenDocument, TokenModel>(MODEL_NAME, TokenSchema, "tokens")

export default Token
