import NextAuth, { NextAuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LINE from "next-auth/providers/line";

export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            id: "google",
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },

        }),
        Facebook({
            clientId: String(process.env.FACEBOOK_APP_ID),
            clientSecret: String(process.env.FACEBOOK_APP_SECRET),
        }),
        AzureAD({
            clientId: String(process.env.AZURE_AD_CLIENT_ID),
            clientSecret: String(process.env.AZURE_AD_CLIENT_SECRET),
            tenantId: String(process.env.AZURE_AD_TENANT_ID),
        }),
        LINE({
            clientId: String(process.env.LINE_CLIENT_ID),
            authorization: {
                params: { scope: "profile openid email", bot_prompt: "aggressive" }
                //line v2.1 bot_prompt normal/aggressive for add friend bot
            },
            clientSecret: String(process.env.LINE_CLIENT_SECRET),
            profile: (profile) => {
                return {
                    id: profile.sub,
                    name: profile?.name,
                    email: profile?.email,
                    image: profile.picture
                }
            }
        }),
        {
            id: "thaid",
            name: "thaid",
            type: "oauth",
            version: '2.0',
            clientId: String(process.env.THAID_CLIENT_ID),
            clientSecret: String(process.env.THAID_CLIENT_SECRET),
            wellKnown: "https://imauth.bora.dopa.go.th/.well-known/openid-configuration",
            authorization: {
                url: "https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/",
                params:
                {
                    response_type: "code",
                    state: "1234",
                    redirect_uri: "http://localhost:3000/api/auth/callback/thaid",
                    scope: "openid pid address gender birthdate given_name middle_name family_name name given_name_en middle_name_en family_name_en name_en title title_en ial smartcard_code date_of_expiry date_of_issuance"
                },
            },
            client: {
                authorization_signed_response_alg: 'ES256',
                id_token_signed_response_alg: 'ES256',
            },
            idToken: true,
            checks: ["state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }
    ],
    callbacks: {
        async jwt({ token, user, account, trigger, session }: any) {
            console.log("token", token)
            console.log("user", user)
            console.log("account", account)

            return token;
        },
        async signIn({ account, profile, user, credentials }: any) {
            console.log("--------------------------------------------------------------------------------")
            console.log("account.provider", account.provider)
            console.log("account.credentials", account.credentials)

            if (account.provider == "azure-ad") {
                console.log("azure-ad profile", profile)
                console.log("azure-ad user", user)
                console.log("azure-ad credentials", credentials)
                return true
            }
            else if (account.provider == "line") {
                console.log("line profile", profile)
                console.log("line user", user)
                return true
            }
            else {
                return true
            }
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };