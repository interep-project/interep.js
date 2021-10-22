import { Document, Model } from "mongoose"
import { findByHashId } from "./TelegramUser.statics"

export interface ITelegramUser {
    hashId: string
    joined: boolean
}

export interface ITelegramUserDocument extends ITelegramUser, Document {}

export interface ITelegramUserModel extends Model<ITelegramUserDocument> {
    findByHashId: typeof findByHashId
}
