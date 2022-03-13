import TelegramGroup from "./telegramGroup"

/* istanbul ignore next */
export default function getTelegramGroups(): TelegramGroup[] {
    return Object.values(TelegramGroup)
}
