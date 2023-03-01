export type Bin = [number, number]

export enum Operator {
    Eq = "eq",
    Gt = "gt",
    Lt = "lt",
    Gte = "gte"
}

export type Condition = {
    operator: Operator
    operand: number | string | boolean
    binIndexGrantedIfSatisfied: number
}

export type RuleDef = {
    bins: Bin[]
    condition: Condition
}
