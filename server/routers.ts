import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { createBookingRequest } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { commerceRouter } from "./routers/commerce";

const bookingInputSchema = z.object({
  name: z.string().trim().min(2, "Adınızı daxil edin.").max(120),
  email: z.string().trim().email("Etibarlı e-poçt ünvanı daxil edin.").max(320),
  inquiryType: z.enum(["event", "birthday", "corporate", "wedding", "project", "general"]),
  message: z.string().trim().min(10, "Mesaj ən azı 10 simvol olmalıdır.").max(2000),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  commerce: commerceRouter,
  contact: router({
    send: publicProcedure.input(bookingInputSchema).mutation(async ({ input }) => {
      return createBookingRequest(input);
    }),
  }),
});

export type AppRouter = typeof appRouter;
