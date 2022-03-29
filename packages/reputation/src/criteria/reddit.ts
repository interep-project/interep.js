import { ReputationCriteria } from "../types/criteria"

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
            name: "gold",
            rules: [
                {
                    parameter: "premiumSubscription",
                    value: true
                },
                {
                    parameter: "karma",
                    value: {
                        ">": 10000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        ">": 5000
                    }
                },
                {
                    parameter: "linkedIdentities",
                    value: {
                        ">": 3
                    }
                }
            ]
        },
        {
            name: "silver",
            rules: [
                {
                    parameter: "premiumSubscription",
                    value: null
                },
                {
                    parameter: "karma",
                    value: {
                        ">": 5000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        ">": 2000
                    }
                },
                {
                    parameter: "linkedIdentities",
                    value: {
                        ">": 2
                    }
                }
            ]
        },
        {
            name: "bronze",
            rules: [
                {
                    parameter: "premiumSubscription",
                    value: null
                },
                {
                    parameter: "karma",
                    value: {
                        ">": 1000
                    }
                },
                {
                    parameter: "coins",
                    value: {
                        ">": 500
                    }
                },
                {
                    parameter: "linkedIdentities",
                    value: null
                }
            ]
        }
    ]
} as ReputationCriteria
