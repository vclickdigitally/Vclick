import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { logger } from "@/lib/logger";

export const authProviders = [
  // 1. Credentials Provider (Email & Password)
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      try {
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            userWebsites: {
              select: { websiteId: true },
            },
          },
        });

        if (!user || !user.password) {
          logger.warn(`Failed login attempt: User not found or password not set for ${credentials.email}`);
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          logger.warn(`Failed login attempt: Invalid password for ${credentials.email}`);
          return null;
        }

        const websiteIds = user.userWebsites.map((uw) => uw.websiteId);

        logger.info(`Successful login: ${user.email} (Role: ${user.role})`);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          websiteIds,
        };
      } catch (error) {
        logger.error(`Database authorization failure during credentials check`, error);
        return null;
      }
    },
  }),

  // 2. Future-Ready OAuth Providers (Configured to load dynamically from environment keys)
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID || "google-client-id-placeholder",
    clientSecret: process.env.AUTH_GOOGLE_SECRET || "google-client-secret-placeholder",
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),

  GitHubProvider({
    clientId: process.env.AUTH_GITHUB_ID || "github-client-id-placeholder",
    clientSecret: process.env.AUTH_GITHUB_SECRET || "github-client-secret-placeholder",
  }),

  AzureADProvider({
    clientId: process.env.AUTH_MICROSOFT_ID || "microsoft-client-id-placeholder",
    clientSecret: process.env.AUTH_MICROSOFT_SECRET || "microsoft-client-secret-placeholder",
    tenantId: process.env.AUTH_MICROSOFT_TENANT_ID || "common",
  }),
];
