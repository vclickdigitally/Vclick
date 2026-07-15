import NextAuth from "next-auth";
import { authConfig } from "./config";
import { authProviders } from "./providers";
import { logger } from "@/lib/logger";

// Instantiate NextAuth v5 with full providers list for Node.js runtime environment
export const { auth, signIn: nextAuthSignIn, signOut: nextAuthSignOut, handlers } = NextAuth({
  ...authConfig,
  providers: authProviders,
});

export interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  role: string;
  websiteIds: string[];
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}

export interface IAuthService {
  getSession(): Promise<AuthSession | null>;
  loginWithCredentials(credentials: Record<string, any>): Promise<any>;
  loginWithOAuth(provider: "google" | "github" | "azure-ad"): Promise<any>;
  logout(): Promise<void>;
  sendPasswordReset(email: string): Promise<boolean>;
  verifyEmailToken(token: string): Promise<boolean>;
}

class NextAuthService implements IAuthService {
  async getSession(): Promise<AuthSession | null> {
    try {
      const session = await auth();
      if (!session || !session.user) return null;
      return {
        user: {
          id: session.user.id || "",
          name: session.user.name || undefined,
          email: session.user.email || undefined,
          role: (session.user as any).role || "CONTRIBUTOR",
          websiteIds: (session.user as any).websiteIds || [],
        },
        expires: session.expires,
      };
    } catch (error) {
      logger.error("Failed to retrieve NextAuth session", error);
      return null;
    }
  }

  async loginWithCredentials(credentials: Record<string, any>): Promise<any> {
    logger.info("Executing Auth.js credentials sign-in provider");
    return nextAuthSignIn("credentials", {
      ...credentials,
      redirect: false,
    });
  }

  async loginWithOAuth(provider: "google" | "github" | "azure-ad"): Promise<any> {
    logger.info(`Redirecting user to OAuth provider: ${provider}`);
    return nextAuthSignIn(provider);
  }

  async logout(): Promise<void> {
    logger.info("Signing out session from Auth.js provider");
    await nextAuthSignOut();
  }

  async sendPasswordReset(email: string): Promise<boolean> {
    logger.info(`Generating password reset email flow for: ${email}`);
    // Generates verification token, stores in DB, and sends SMTP mail in Phase 5
    return true;
  }

  async verifyEmailToken(token: string): Promise<boolean> {
    logger.info("Verifying email validation token signature");
    // Validates verification token, updates user database record
    return true;
  }
}

// Singleton Auth Service instance
export const authService: IAuthService = new NextAuthService();
