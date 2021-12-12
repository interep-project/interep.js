import { Criteria } from "../types/criteria"

export default {
    provider: "github",
    parameters: [
        { name: "followers", type: "number" },
        { name: "receivedStars", type: "number" },
        { name: "proPlan", type: "boolean" }
    ],
    reputationLevels: [
        {
            name: "gold",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        min: 500
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        min: 200
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
                        min: 100
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        min: 80
                    }
                }
            ]
        },
        {
            name: "bronze",
            rules: [
                {
                    parameter: "proPlan",
                    value: true
                },
                {
                    parameter: "followers",
                    value: {
                        min: 50
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        min: 40
                    }
                }
            ]
        }
    ]
} as Criteria
