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
    ],
    callbacks: {
        async signIn({ account, profile, user }: any) {
            if (account.provider == "azure-ad") {
                console.log("azure-ad profile", profile)
                console.log("azure-ad user", user)
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