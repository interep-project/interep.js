import { Criteria } from "../types/criteria"

export default {
    web2Provider: "twitter",
    parameters: [
        { name: "followers", type: "number" },
        { name: "botometerOverallScore", type: "number" },
        { name: "verifiedProfile", type: "boolean" }
    ],
    reputationLevels: [
        {
            name: "GOLD",
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
            name: "SILVER",
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
            name: "BRONZE",
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
