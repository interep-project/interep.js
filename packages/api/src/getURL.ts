import checkParameter from "./checkParameter"
import { Environment } from "./types/config"

export default function getURL(environment: Environment, onchain = false): string {
    checkParameter(environment, "environment", "string")
    checkParameter(onchain, "onchain", "boolean")

    if (!onchain) {
        switch (environment) {
            case "development":
                return "http://localhost:3000/api/v1"
            case "staging":
                return "https://kovan.interep.link/api/v1"
            case "production":
                return "https://interep.link/api/v1"
            default:
                throw new TypeError(`Environment '${environment}' is not supported`)
        }
    } else {
        /* istanbul ignore next */
        switch (environment) {
            case "staging":
                return "https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan"
            default:
                throw new TypeError(`Environment '${environment}' is not supported`)
        }
    }
}
