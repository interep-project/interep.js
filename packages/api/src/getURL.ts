import checkParameter from "./checkParameter"
import { Environment } from "./types/config"

export default function getURL(environment: Environment): string {
    checkParameter(environment, "environment", "string")

    switch (environment) {
        case "development":
            return "http://localhost:3000/api"
        case "staging":
            return "https://kovan.interrep.link/api"
        case "production":
            return "https://interrep.link/api"
        default:
            throw new TypeError(`Environment '${environment}' is not supported`)
    }
}
