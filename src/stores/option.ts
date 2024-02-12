import { z } from "zod";

export const optionSchema = z.object({
  name: z.string(),
  img: z.string(),
  desc: z.string().optional(),
  href: z.string().url().optional(),
});

export type OptionType = z.infer<typeof optionSchema>;
