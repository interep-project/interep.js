export type Transaction = {
    response: {
        hash: string
        blockNumber?: number
        timestamp?: number
        chainId: number
    }
    receipt?: {
        status: 0 | 1
        confirmations: number
    }
}
