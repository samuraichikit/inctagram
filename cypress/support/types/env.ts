import { z } from 'zod';

export const envSchema = z.object({
    ADMIN_EMAIL: z.string(),
    ADMIN_PASSWORD: z.string(),
    CYPRESS_BASE_URL: z.string()
});

const env = envSchema.parse(process.env);
export default env;
export {}
