import { z } from "zod";

export const env = z
  .object({
    LAST_FM_API_KEY: z.string(),
    LAST_FM_USERNAME: z.string(),
    STEAM_API_KEY: z.string(),
    STEAM_ID: z.string(),
    HARDCOVER_API_TOKEN: z.string(),
    PLAUSIBLE_URL: z.string(),
    PLAUSIBLE_API_KEY: z.string(),
  })
  .parse(process.env);
