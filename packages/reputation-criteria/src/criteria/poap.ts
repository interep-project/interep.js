import { Criteria } from "../types/criteria"

export default {
    web2Provider: "poap",
    parameters: [{ name: "tokens", type: "number" }],
    reputationLevels: [
        {
            name: "GOLD",
            rules: [
                {
                    parameter: "tokens",
                    value: {
                        min: 5
                    }
                }
            ]
        },
        {
            name: "SILVER",
            rules: [
                {
                    parameter: "tokens",
                    value: {
                        min: 3
                    }
                }
            ]
        },
        {
            name: "BRONZE",
            rules: [
                {
                    parameter: "tokens",
                    value: {
                        min: 1
                    }
                }
            ]
        }
    ]
} as Criteria
