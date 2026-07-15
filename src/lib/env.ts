import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection URL"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters long"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid callback URL (e.g. http://localhost:3000)"),
  SMTP_HOST: z.string().min(1, "SMTP_HOST is required for email verification & password recovery"),
  SMTP_PORT: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive()),
  SMTP_USER: z.string().min(1, "SMTP_USER is required for mail services"),
  SMTP_PASSWORD: z.string().min(1, "SMTP_PASSWORD is required for mail services"),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Environment validation failed:");
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error("Invalid server environment configuration");
  }

  console.log("✅ Environment configuration validated successfully");
  return result.data;
}
