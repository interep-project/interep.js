import { model, models } from "mongoose"
import TelegramUserSchema from "./TelegramUser.schema"
import { ITelegramUserDocument, ITelegramUserModel } from "./TelegramUser.types"

const TELEGRAM_USER_MODEL_NAME = "TelegramUser"

const TelegramUser: ITelegramUserModel =
    (models[TELEGRAM_USER_MODEL_NAME] as ITelegramUserModel) ||
    model<ITelegramUserDocument, ITelegramUserModel>(TELEGRAM_USER_MODEL_NAME, TelegramUserSchema, "telegramUsers")

export default TelegramUser
