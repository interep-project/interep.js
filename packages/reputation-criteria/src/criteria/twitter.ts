import { Criteria } from "../types/criteria"

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
                    parameter: "verifiedProfile",
                    value: true
                },
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
                }
            ]
        }
    ]
} as Criteria
