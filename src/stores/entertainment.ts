import { z } from "zod";
import { optionSchema } from "./option";

export const entertainmentSchema = optionSchema;

export type EntertainmentItem = z.infer<typeof entertainmentSchema>;
