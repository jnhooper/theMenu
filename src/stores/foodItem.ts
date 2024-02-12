import { z } from "zod";
import { optionSchema } from "./option";

export const foodItemSchema = optionSchema.omit({ href: true });

export type FoodItem = z.infer<typeof foodItemSchema>;
