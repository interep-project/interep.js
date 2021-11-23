import { Schema } from "mongoose"
import { findByHashId } from "./TelegramUser.statics"
import { TelegramUserData, TelegramUserDocument, TelegramUserModel } from "./TelegramUser.types"

const TelegramUserSchemaFields: Record<keyof TelegramUserData, any> = {
    hashId: { type: String, required: true, index: true, unique: true },
    hasJoined: { type: Boolean, required: true }
}

const TelegramUserSchema = new Schema<TelegramUserDocument, TelegramUserModel>(TelegramUserSchemaFields)

TelegramUserSchema.statics.findByHashId = findByHashId

export default TelegramUserSchema
