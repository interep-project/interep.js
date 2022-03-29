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
                        ">": 500
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        ">": 200
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
                        ">": 100
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        ">": 80
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
                        ">": 50
                    }
                },
                {
                    parameter: "receivedStars",
                    value: {
                        ">": 40
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
