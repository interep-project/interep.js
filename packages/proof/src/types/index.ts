export type BigNumber = number | bigint | string

export type GroupId =
    | BigNumber
    | {
          provider?: string
          name?: string
      }

export type ZKFiles = {
    wasmFilePath: string
    zkeyFilePath: string
}
