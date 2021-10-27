import { Document, Model } from "mongoose"
import { findByHashId } from "./TelegramUser.statics"

export type TelegramUserData = {
    hashId: string
    joined: boolean
}

export type TelegramUserDocument = TelegramUserData & Document

export type TelegramUserModel = Model<TelegramUserDocument> & {
    findByHashId: typeof findByHashId
}
