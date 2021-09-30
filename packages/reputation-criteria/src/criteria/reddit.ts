import { Criteria } from "../types/criteria"

export default {
    provider: "reddit",
    parameters: [
        { name: "premiumSubscription", type: "boolean" },
        { name: "karma", type: "number" },
        { name: "coins", type: "number" },
        { name: "linkedIdentities", type: "number" }
    ],
    reputationLevels: [
        {
            name: "GOLD",
            rules: [
                {
                    parameter: "premiumSubscription",
                    value: true
                },
                {
                    parameter: "karma",
                    value: {
                        min: 10000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        min: 5000
                    }
                },
                {
                    parameter: "linkedIdentities",
                    value: {
                        min: 3
                    }
                }
            ]
        },
        {
            name: "SILVER",
            rules: [
                {
                    parameter: "karma",
                    value: {
                        min: 5000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        min: 2000
                    }
                },
                {
                    parameter: "linkedIdentities",
                    value: {
                        min: 2
                    }
                }
            ]
        },
        {
            name: "BRONZE",
            rules: [
                {
                    parameter: "karma",
                    value: {
                        min: 1000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        min: 500
                    }
                }
            ]
        }
    ]
} as Criteria
