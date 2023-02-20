import { OAuthProvider } from "../types"
import { Operator, RuleDef } from "../types/rule"

const CRITERIA_CONFIG: Record<OAuthProvider, RuleDef> = {
    [OAuthProvider.GITHUB]: {
        bins: [
            [0, 1],
            [1, 10],
            [10, 100],
            [100, 1000]
        ], // stars
        condition: { operator: Operator.Gte, operand: 1, binIndexGrantedIfSatisfied: 2 } // sponsors + sponsoring
    },
    [OAuthProvider.REDDIT]: {
        bins: [
            [0, 2000],
            [2000, 20000],
            [20000, 100000],
            [100000, 200000]
        ], // total karma
        condition: { operator: Operator.Eq, operand: true, binIndexGrantedIfSatisfied: 1 } // is_gold
    },
    [OAuthProvider.TWITTER]: {
        bins: [
            [0, 100],
            [100, 1000],
            [1000, 10000],
            [10000, 100000]
        ], // followers
        condition: { operator: Operator.Eq, operand: true, binIndexGrantedIfSatisfied: 2 } // verified
    }
}

export default CRITERIA_CONFIG
