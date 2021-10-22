import TelegramUser from "./TelegramUser.model"
import { ITelegramUserDocument } from "./TelegramUser.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByHashId(this: typeof TelegramUser, hashId: string): Promise<ITelegramUserDocument | null> {
    return this.findOne({ hashId })
}
