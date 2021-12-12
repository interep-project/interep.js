import TelegramGroup from "./telegramGroup"

export default function getTelegramGroups(): TelegramGroup[] {
    return Object.values(TelegramGroup)
}
