import { ReputationCriteria } from "../types/criteria"

export default {
    provider: "twitter",
    parameters: [
        { name: "followers", type: "number" },
        { name: "botometerOverallScore", type: "number" },
        { name: "verifiedProfile", type: "boolean" }
    ],
    reputationLevels: [
        {
            name: "gold",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        min: 7000
                    }
                },
                {
                    parameter: "botometerOverallScore",
                    value: {
                        max: 1
                    }
                },
                {
                    parameter: "verifiedProfile",
                    value: true
                }
            ]
        },
        {
            name: "silver",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        min: 2000
                    }
                },
                {
                    parameter: "botometerOverallScore",
                    value: {
                        max: 1.5
                    }
                },
                {
                    parameter: "verifiedProfile",
                    value: null
                }
            ]
        },
        {
            name: "bronze",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        min: 500
                    }
                },
                {
                    parameter: "botometerOverallScore",
                    value: {
                        max: 2
                    }
                },
                {
                    parameter: "verifiedProfile",
                    value: null
                }
            ]
        }
    ]
} as ReputationCriteria
