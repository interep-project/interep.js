import { Schema } from "mongoose"
import { findByHashId } from "./TelegramUser.statics"
import { ITelegramUser, ITelegramUserDocument, ITelegramUserModel } from "./TelegramUser.types"

const TelegramUserSchemaFields: Record<keyof ITelegramUser, any> = {
    hashId: { type: String, required: true, index: true, unique: true },
    joined: { type: Boolean, required: true }
}

const TelegramUserSchema = new Schema<ITelegramUserDocument, ITelegramUserModel>(TelegramUserSchemaFields)

TelegramUserSchema.statics.findByHashId = findByHashId

export default TelegramUserSchema
