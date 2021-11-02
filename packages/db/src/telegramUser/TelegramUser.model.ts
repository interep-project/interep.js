import { model, models } from "mongoose"
import TelegramUserSchema from "./TelegramUser.schema"
import type { TelegramUserDocument, TelegramUserModel } from "./TelegramUser.types"

const TELEGRAM_USER_MODEL_NAME = "TelegramUser"

const TelegramUser: TelegramUserModel =
    (models[TELEGRAM_USER_MODEL_NAME] as TelegramUserModel) ||
    model<TelegramUserDocument, TelegramUserModel>(TELEGRAM_USER_MODEL_NAME, TelegramUserSchema, "telegramUsers")

export default TelegramUser
