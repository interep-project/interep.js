import TelegramUser from "./TelegramUser.model"
import { TelegramUserDocument } from "./TelegramUser.types"

// eslint-disable-next-line import/prefer-default-export
export async function findByHashId(this: typeof TelegramUser, hashId: string): Promise<TelegramUserDocument | null> {
    return this.findOne({ hashId })
}
