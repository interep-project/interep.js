import CRITERIA_CONFIG from "./config"
import { createRule } from "./utils"

const criteria = Object.fromEntries(
    Object.entries(CRITERIA_CONFIG).map(([provider, config]) => [provider, createRule(config)])
)

export default criteria
