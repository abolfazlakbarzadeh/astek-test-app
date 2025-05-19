import {z} from 'zod'
import dotenv from 'dotenv'

dotenv.config();

const envSchema = z.object({
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string().optional(),
    DB_DATABASE: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.string().regex(/^\d+$/).transform(Number),
    DB_DIALECT: z.string(),
    SERVER_HOST: z.string().default('localhost'),
    SERVER_PORT: z.string().regex(/^\d+$/).transform(Number).default('3000'),
    JWT_SECRET: z.string(),
})


const _env = envSchema.safeParse(process.env);


if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    process.exit(1);
}

export const env = _env.data
