import { model, models } from "mongoose"
import OAuthAccountSchema from "./OAuthAccount.schema"
import { OAuthAccountDocument, OAuthAccountModel } from "./OAuthAccount.types"

const MODEL_NAME = "OAuthAccount"

// Because of Next.js HMR we need to get the model if it was already compiled
const OAuthAccount: OAuthAccountModel =
    (models[MODEL_NAME] as OAuthAccountModel) ||
    model<OAuthAccountDocument, OAuthAccountModel>(MODEL_NAME, OAuthAccountSchema, "oAuthAccounts")

export default OAuthAccount
