import { sha256 as _sha256 } from "js-sha256"
import { eddsa } from "circomlib"

/**
 * Return an hexadecimal sha256 hash of the message passed as parameter.
 * @param message Message to hash.
 * @returns The hexadecimal hash of the message.
 */
function sha256(message: string): string {
    const hash = _sha256.create()

    hash.update(message)

    return hash.hex()
}

function hexToBigInt(hex: string) {
    return BigInt(`0x${hex}`)
}

/**
 * Create a Semaphore identity by deriving the EdDSA keys from a signed message.
 * @param sign The function to sign the message.
 * @param groupId The group id of the message.
 * @param nonce The nonce of the message.
 * @returns A Semaphore identity.
 */
export default async function semethid(
    sign: (message: string) => Promise<string>,
    groupId: string,
    nonce = 0
): Promise<any> {
    const message = await sign(
        `Sign this message to generate a Semaphore identity for the group ${groupId} with key nonce: ${nonce}.`
    )
    const messageHash = sha256(message)
    const privKey = Buffer.from(messageHash, "hex")
    const pubKey = eddsa.prv2pub(privKey)
    const identityNullifier = hexToBigInt(sha256(`${messageHash}identity_nullifier`))
    const identityTrapdoor = hexToBigInt(sha256(`${messageHash}identity_trapdoor`))

    return {
        keypair: { pubKey, privKey },
        identityTrapdoor,
        identityNullifier
    }
}
