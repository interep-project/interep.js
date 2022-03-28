import { ReputationCriteria } from "../types/criteria"

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
                },
                {
                    parameter: "proPlan",
                    value: null
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
                },
                {
                    parameter: "proPlan",
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
                        min: 50
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        min: 40
                    }
                },
                {
                    parameter: "proPlan",
                    value: true
                }
            ]
        }
    ]
} as ReputationCriteria
