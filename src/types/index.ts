/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

/** Auth */
const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Auth;

/** Credit */
const creditSchema = z.object({
  name: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email(),
  branchId: z.number(),
  incomes: z.number(),
  amount: z.number(),
  installments: z.number(),
  monthlyPayment: z.union([z.number(), z.null()]),
  totalPayment: z.union([z.number(), z.null()]),
  status: z.string(),
});

export const creditResponseSchema = creditSchema.omit({
  name: true,
  lastname: true,
  email: true,
  branchId: true,
  incomes: true,
  amount: true,
  installments: true,
});

export const creditStatusCountSchema = z.object({
  status: z.string(),
  total: z.number(),
});

export const creditsStatusCountSchema = z.array(creditStatusCountSchema);

type Credit = z.infer<typeof creditSchema>;

export type CreditRequestForm = Omit<
  Credit,
  'monthlyPayment' | 'totalPayment' | 'status'
>;

export type CreditResponse = z.infer<typeof creditResponseSchema>;

/** Branches */
const branchSchema = z.object({
  name: z.string(),
  id: z.number(),
});

type Branch = z.infer<typeof branchSchema>;
type Branches = z.infer<typeof branchesSchema>;

export const branchesSchema = z.array(branchSchema);
