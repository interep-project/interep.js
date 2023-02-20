import { ReputationLevel } from "../types"
import { Condition, Operator, RuleDef } from "../types/rule"

export default function getBin(x: number, bins: [number, number][]): number {
    if (x < 0) throw new Error("only accept positive numbers")

    let i = 0
    while (i < bins.length && !(bins[i][0] <= x && x < bins[i][1])) {
        i += 1
    }

    return i
}

const operate = (input: any, op: Condition) => {
    const { operator, operand } = op

    switch (operator) {
        case Operator.Eq:
            return input === operand
        case Operator.Gt:
            return input > operand
        case Operator.Lt:
            return input < operand
        case Operator.Gte:
            return input >= operand
        default:
            throw new Error(`Unknown operator ${operator}`)
    }
}

export const createRule =
    ({ bins, condition }: RuleDef) =>
    (numericalAttr: number, extraAttr: any) => {
        const binIndex = getBin(numericalAttr, bins)
        const extraAttrSatisfiesCondition = operate(extraAttr, condition)
        const tierIndex = extraAttrSatisfiesCondition ? condition.binIndexGrantedIfSatisfied : binIndex
        return [
            ReputationLevel.Commoner,
            ReputationLevel.UpAndComing,
            ReputationLevel.Established,
            ReputationLevel.Star,
            ReputationLevel.Icon
        ][tierIndex]
    }
