import { z } from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const subscribeNewsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type TSubscribeNewsletterSchema = z.infer<
  typeof subscribeNewsletterSchema
>;

export const formatString = (string: string) =>
  string
    .replace(/[^a-zA-Z0-9\sø]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
