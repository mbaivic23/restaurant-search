import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email je obavezan")
    .email("Unesite valjanu email adresu"),
  password: z
    .string()
    .min(1, "Lozinka je obavezna")
    .min(6, "Lozinka mora imati najmanje 6 znakova"),
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Ime je obavezno")
    .min(2, "Ime mora imati najmanje 2 znaka"),
  lastName: z
    .string()
    .min(1, "Prezime je obavezno")
    .min(2, "Prezime mora imati najmanje 2 znaka"),
  email: z
    .string()
    .min(1, "Email je obavezan")
    .email("Unesite valjanu email adresu"),
  password: z
    .string()
    .min(1, "Lozinka je obavezna")
    .min(6, "Lozinka mora imati najmanje 6 znakova"),
});

export const searchInputSchema = z.string()
  .max(50, "Pretraga je preduga")
  .refine(text => !(/^\s+$/.test(text)), "Pretraga ne može sadržavati samo razmake");

export const searchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  search: searchInputSchema.optional(),
});

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.string(),
  language: z.string(),
  banned: z.boolean(),
});

export const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  rating: z.number().nullable(),
  user_ratings_total: z.number().nullable(),
  price_level: z.number().nullable(),
  icon_url: z.string(),
});

export const restaurantsResponseSchema = z.object({
  totalRestaurants: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  restaurants: z.array(restaurantSchema),
  hasSampleLimit: z.boolean(),
  fixedSampleSize: z.number(),
  maxRecords: z.number(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type User = z.infer<typeof userSchema>;
export type Restaurant = z.infer<typeof restaurantSchema>;
export type SearchParams = z.infer<typeof searchParamsSchema>;