import type { Document, Model } from "mongoose"
import type { findByHashId } from "./EmailUser.statics"

export type EmailUserData = {
    hashId: string
    hasJoined: boolean
    verificationToken: string
}

export type EmailUserDocument = EmailUserData & Document

export type EmailUserModel = Model<EmailUserDocument> & {
    findByHashId: typeof findByHashId
}
