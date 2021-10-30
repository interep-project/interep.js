import { OAuthProvider } from "./config"

/**
 * Returns all supported OAuth providers.
 * @returns A list of providers.
 */
export default function getOAuthProviders(): OAuthProvider[] {
    return Object.values(OAuthProvider)
}
