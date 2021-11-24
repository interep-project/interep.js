import { Schema } from "mongoose"
import { findByHashId } from "./EmailUser.statics"
import { EmailUserData, EmailUserDocument, EmailUserModel } from "./EmailUser.types"

const EmailUserSchemaFields: Record<keyof EmailUserData, any> = {
    hashId: { type: String, required: true, index: true, unique: true },
    hasJoined: { type: Boolean, required: true },
    verificationToken: { type: String, required: true }
}

const EmailUserSchema = new Schema<EmailUserDocument, EmailUserModel>(EmailUserSchemaFields)

EmailUserSchema.statics.findByHashId = findByHashId

export default EmailUserSchema
