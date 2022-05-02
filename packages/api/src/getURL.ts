import checkParameter from "./checkParameter"
import { Network } from "./types/config"

export default function getURL(network: Network): string {
    checkParameter(network, "network", "string")

    switch (network) {
        case "local":
            return "http://localhost:3000/api/v1"
        case "kovan":
            return "https://kovan.interep.link/api/v1"
        case "goerli":
            return "https://goerli.interep.link/api/v1"
        case "arbitrum":
            return "https://app.interep.link/api/v1"
        default:
            throw new TypeError(`Network '${network}' is not supported`)
    }
}
